import { useEffect, useMemo, useState } from 'react'
import { fetchGithubRepos } from '@/entities/github/api/githubApi'
import type { GithubRepo } from '@/entities/github/model/types'
import { getCachedData, getStaleData, setCachedData } from '@/shared/lib/localCache'
import {
    profileRepo,
    especiais,
    destaques,
    mvpRepos,
    projetosOriginais,
} from '../api/projects.data'
import type {
    CatalogIndicators,
    CatalogProject,
    CatalogSection,
    CuratedProject,
    ProjectSectionId,
} from './types'

/* ------------------------------------------------------------------ */
/* Topics reservados                                                   */
/* ------------------------------------------------------------------ */

/**
 * Aceita as duas grafias — `mvp` e `portfolio-mvp` — para que a escolha do
 * prefixo não exija mudança de código. Qualquer topic fora desta lista é
 * tratado como etiqueta de tecnologia e exibido no card.
 */
const RESERVED: Record<string, 'especiais' | 'destaques' | 'mvp' | 'curso' | 'oculto'> = {
    especial: 'especiais',
    'portfolio-especial': 'especiais',
    destaque: 'destaques',
    'portfolio-destaque': 'destaques',
    mvp: 'mvp',
    'portfolio-mvp': 'mvp',
    curso: 'curso',
    'portfolio-curso': 'curso',
    oculto: 'oculto',
    'portfolio-oculto': 'oculto',
}

/** Repositórios que nunca aparecem, independentemente de topic. */
const SEMPRE_FORA = ['.github']

const SECTION_LABEL: Record<ProjectSectionId, string> = {
    especiais: 'Especiais',
    destaques: 'Top Destaques',
    mvp: 'MVP & Aplicações',
    projetos: 'Projetos',
    forks: 'Forks',
    arquivados: 'Arquivados',
}

const SECTION_ORDER: ProjectSectionId[] = [
    'especiais',
    'destaques',
    'mvp',
    'projetos',
    'forks',
    'arquivados',
]

/* ------------------------------------------------------------------ */
/* Enriquecimento vindo do arquivo local                               */
/* ------------------------------------------------------------------ */

interface CuratedEntry {
    project: CuratedProject
    section: ProjectSectionId
}

function extractRepoName(url: string): string | null {
    const match = url.match(/github\.com\/[^/]+\/([^/]+)/)
    return match ? match[1].toLowerCase() : null
}

/**
 * Indexa o projects.data.ts por nome de repositório. O arquivo continua
 * intacto: ele deixa de ser a fonte da classificação e passa a ser a fonte
 * do texto — descrição, tag e cor — além de servir de segunda opção
 * enquanto os topics não estiverem todos marcados.
 */
function buildCuratedIndex(): Map<string, CuratedEntry> {
    const index = new Map<string, CuratedEntry>()
    const grupos: [CuratedProject[], ProjectSectionId][] = [
        [profileRepo, 'projetos'],
        [especiais, 'especiais'],
        [destaques, 'destaques'],
        [mvpRepos, 'mvp'],
        [projetosOriginais, 'projetos'],
    ]

    grupos.forEach(([lista, section]) => {
        lista.forEach((project) => {
            const repoLink = project.links.find((l) => l.url.includes('github.com'))
            const name = repoLink ? extractRepoName(repoLink.url) : null
            if (name) index.set(name, { project, section })
        })
    })

    return index
}

/* ------------------------------------------------------------------ */
/* Roteamento — a precedência combinada                                */
/* ------------------------------------------------------------------ */

interface Routed {
    section: ProjectSectionId | null
    isCourse: boolean
    techTopics: string[]
}

function route(repo: GithubRepo, curated: CuratedEntry | undefined): Routed {
    const topics = repo.topics ?? []
    const reservados = topics.map((t) => RESERVED[t]).filter(Boolean)
    const techTopics = topics.filter((t) => !RESERVED[t])
    const isCourse = reservados.includes('curso')

    // 1 — oculto
    if (reservados.includes('oculto')) return { section: null, isCourse, techTopics }
    // 2 — sempre fora
    if (SEMPRE_FORA.includes(repo.name.toLowerCase())) {
        return { section: null, isCourse, techTopics }
    }
    // 3 — topic de categoria vence fork e arquivado
    const porTopic = reservados.find((r) => r === 'especiais' || r === 'destaques' || r === 'mvp')
    if (porTopic) return { section: porTopic, isCourse, techTopics }
    // 4 — categoria do arquivo local
    if (curated) return { section: curated.section, isCourse, techTopics }
    // 5 e 6 — arquivado e fork
    if (repo.archived) return { section: 'arquivados', isCourse, techTopics }
    if (repo.fork) return { section: 'forks', isCourse, techTopics }
    // 7 — o resto
    return { section: 'projetos', isCourse, techTopics }
}

/* ------------------------------------------------------------------ */
/* Hook                                                                */
/* ------------------------------------------------------------------ */

const CACHE_KEY = 'projetos:catalogo-github'

export type CatalogState = 'loading' | 'ok' | 'stale' | 'error'

export function useProjectCatalog() {
    const [repos, setRepos] = useState<GithubRepo[] | null>(null)
    const [state, setState] = useState<CatalogState>('loading')

    useEffect(() => {
        let active = true

        const cached = getCachedData<GithubRepo[]>(CACHE_KEY)
        if (cached) {
            setRepos(cached.data)
            setState('ok')
            return
        }

        fetchGithubRepos()
            .then((data) => {
                if (!active) return
                setCachedData(CACHE_KEY, data)
                setRepos(data)
                setState('ok')
            })
            .catch(() => {
                if (!active) return
                const stale = getStaleData<GithubRepo[]>(CACHE_KEY)
                if (stale) {
                    setRepos(stale.data)
                    setState('stale')
                } else {
                    setState('error')
                }
            })

        return () => {
            active = false
        }
    }, [])

    const { sections, indicators } = useMemo(() => {
        const curatedIndex = buildCuratedIndex()
        const buckets = new Map<ProjectSectionId, CatalogProject[]>()
        SECTION_ORDER.forEach((id) => buckets.set(id, []))

        const lista = repos ?? []

        lista.forEach((repo) => {
            const curated = curatedIndex.get(repo.name.toLowerCase())
            const { section, isCourse, techTopics } = route(repo, curated)
            if (!section) return

            buckets.get(section)?.push({
                id: repo.id,
                name: repo.name,
                section,
                title: curated?.project.title ?? repo.name,
                description: curated?.project.description ?? repo.description ?? '',
                createdYear: new Date(repo.created_at).getFullYear(),
                pushedAt: repo.pushed_at,
                openIssues: repo.open_issues_count,
                techTopics,
                homepage: repo.homepage,
                repoUrl: repo.html_url,
                isFork: repo.fork,
                isArchived: repo.archived,
                isCourse,
                tag: curated?.project.tag,
                accentColor: curated?.project.accentColor,
            })
        })

        // Mais recente primeiro — reforça que os repositórios evoluem.
        buckets.forEach((items) =>
            items.sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()),
        )

        const sections: CatalogSection[] = SECTION_ORDER.map((id) => {
            const items = buckets.get(id) ?? []
            return { id, label: SECTION_LABEL[id], total: items.length, items }
        }).filter((s) => s.total > 0)

        const todos = [...buckets.values()].flat()
        const limite30d = Date.now() - 30 * 86_400_000

        const indicators: CatalogIndicators = {
            repositorios: todos.length,
            ativos30d: todos.filter((p) => new Date(p.pushedAt).getTime() >= limite30d).length,
            issuesAbertas: todos.reduce((soma, p) => soma + p.openIssues, 0),
            noAr: todos.filter((p) => (p.homepage ?? '').trim().length > 0).length,
        }

        return { sections, indicators }
    }, [repos])

    return { sections, indicators, state }
}

/** "hoje", "há 3 dias", "há 2 meses" — sem biblioteca. */
export function relativeTime(iso: string): string {
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
    if (days <= 0) return 'hoje'
    if (days === 1) return 'ontem'
    if (days < 30) return `há ${days} dias`
    const months = Math.floor(days / 30)
    if (months < 12) return months === 1 ? 'há 1 mês' : `há ${months} meses`
    const years = Math.floor(months / 12)
    return years === 1 ? 'há 1 ano' : `há ${years} anos`
}