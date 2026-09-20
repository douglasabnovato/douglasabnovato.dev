import { useEffect, useMemo, useState } from 'react'
import { fetchGists, fetchOrgInfo, fetchUserProfile } from '../api/githubApi'
import { gistsFixos } from '../api/gistsFixos'
import type { GistFixo } from '../api/gistsFixos'
import type { GithubGist, GithubOrg, GithubUser } from './types'
import { getCachedData, getStaleData, setCachedData } from '@/shared/lib/localCache'

/** Quantos gists a seção exibe, contando os fixados. */
const LIMITE_GISTS = 20

/**
 * Quando true, só entram gists que tenham descrição escrita — a descrição
 * vira o critério de curadoria. Hoje está desligado: exibe os mais recentes.
 */
const SOMENTE_COM_DESCRICAO = false

/** Gists e organização mudam pouco. Cache de 24 horas. */
const TTL = 24 * 60 * 60 * 1000
const CACHE_KEY = 'github:extras'

export interface GistExibido {
  id: string
  arquivo: string
  descricao: string | null
  linguagem: string | null
  arquivos: number
  comentarios: number
  atualizadoEm: string | null
  url: string
  fixado: boolean
}

interface Extras {
  user: GithubUser | null
  gists: GithubGist[]
  org: GithubOrg | null
}

function paraExibicao(gist: GithubGist): GistExibido {
  const arquivos = Object.values(gist.files)
  const principal = arquivos[0]
  return {
    id: gist.id,
    arquivo: principal?.filename ?? gist.id,
    descricao: gist.description?.trim() || null,
    linguagem: principal?.language ?? null,
    arquivos: arquivos.length,
    comentarios: gist.comments ?? 0,
    atualizadoEm: gist.updated_at ?? gist.created_at ?? null,
    url: gist.html_url,
    fixado: false,
  }
}

function fixadoParaExibicao(fixo: GistFixo): GistExibido {
  return {
    id: fixo.id,
    arquivo: fixo.arquivo,
    descricao: fixo.descricao,
    linguagem: fixo.linguagem,
    arquivos: 1,
    comentarios: 0,
    atualizadoEm: null,
    url: fixo.url,
    fixado: true,
  }
}

export type ExtrasState = 'loading' | 'ok' | 'stale' | 'error'

export function useGithubExtras() {
  const [extras, setExtras] = useState<Extras | null>(null)
  const [state, setState] = useState<ExtrasState>('loading')

  useEffect(() => {
    let active = true

    const cached = getCachedData<Extras>(CACHE_KEY, TTL)
    if (cached) {
      setExtras(cached.data)
      setState('ok')
      return
    }

    // allSettled: se a organização falhar, os gists continuam aparecendo.
    Promise.allSettled([fetchUserProfile(), fetchGists(), fetchOrgInfo()])
      .then(([u, g, o]) => {
        if (!active) return
        const dados: Extras = {
          user: u.status === 'fulfilled' ? u.value : null,
          gists: g.status === 'fulfilled' ? g.value : [],
          org: o.status === 'fulfilled' ? o.value : null,
        }
        const tudoFalhou = !dados.user && dados.gists.length === 0 && !dados.org
        if (tudoFalhou) {
          const stale = getStaleData<Extras>(CACHE_KEY)
          if (stale) {
            setExtras(stale.data)
            setState('stale')
          } else {
            setState('error')
          }
          return
        }
        setCachedData(CACHE_KEY, dados)
        setExtras(dados)
        setState('ok')
      })
      .catch(() => {
        if (!active) return
        setState('error')
      })

    return () => {
      active = false
    }
  }, [])

  const gists = useMemo(() => {
    const fixos = gistsFixos.map(fixadoParaExibicao)
    const idsFixos = new Set(fixos.map((f) => f.id))

    const automaticos = (extras?.gists ?? [])
      .filter((g) => !idsFixos.has(g.id))
      .map(paraExibicao)
      .filter((g) => (SOMENTE_COM_DESCRICAO ? Boolean(g.descricao) : true))
      .sort((a, b) => {
        const ta = a.atualizadoEm ? new Date(a.atualizadoEm).getTime() : 0
        const tb = b.atualizadoEm ? new Date(b.atualizadoEm).getTime() : 0
        return tb - ta
      })

    return [...fixos, ...automaticos].slice(0, LIMITE_GISTS)
  }, [extras])

  /** Total real da conta; cai para o que foi carregado se o perfil falhar. */
  const totalGists = extras?.user?.public_gists ?? extras?.gists.length ?? 0

  /** A organização só entra na página quando tiver conteúdo público. */
  const org = extras?.org && extras.org.public_repos > 0 ? extras.org : null

  return { gists, totalGists, org, state }
}