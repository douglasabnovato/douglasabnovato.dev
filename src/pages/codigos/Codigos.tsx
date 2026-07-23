import { useEffect, useState } from 'react'
import {
      fetchGithubRepos,
      fetchOpenIssuesForRepo,
      fetchGists,
      fetchOrgInfo,
      hasProductionLink,
} from '@/entities/github/api/githubApi'
import type { GithubRepo, GithubIssue, GithubGist, GithubOrg } from '@/entities/github/model/types'
import { getCachedData, getStaleData, setCachedData } from '@/shared/lib/localCache'

const ESPECIAIS_REPOS = ['learn-tech', 'bootcamps', 'tools', 'career']
const CACHE_KEY = 'codigos-github-data'

interface CodigosData {
      repos: GithubRepo[]
      issues: GithubIssue[]
      gists: GithubGist[]
      org: GithubOrg | null
}

export const Codigos = () => {
      const [data, setData] = useState<CodigosData | null>(null)
      const [lastUpdated, setLastUpdated] = useState<number | null>(null)
      const [isStale, setIsStale] = useState(false)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState<string | null>(null)

      useEffect(() => {
            async function load() {
                  const cached = getCachedData<CodigosData>(CACHE_KEY)
                  if (cached) {
                        setData(cached.data)
                        setLastUpdated(cached.fetchedAt)
                        setLoading(false)
                        return
                  }

                  try {
                        const [reposData, issuesLists, gistsData, orgData] = await Promise.all([
                              fetchGithubRepos(),
                              Promise.all(ESPECIAIS_REPOS.map((repo) => fetchOpenIssuesForRepo(repo))),
                              fetchGists(),
                              fetchOrgInfo(),
                        ])
                        const fresh: CodigosData = {
                              repos: reposData,
                              issues: issuesLists.flat(),
                              gists: gistsData,
                              org: orgData,
                        }
                        const entry = setCachedData(CACHE_KEY, fresh)
                        setData(fresh)
                        setLastUpdated(entry.fetchedAt)
                  } catch (err) {
                        const stale = getStaleData<CodigosData>(CACHE_KEY)
                        if (stale) {
                              setData(stale.data)
                              setLastUpdated(stale.fetchedAt)
                              setIsStale(true)
                        } else {
                              setError(err instanceof Error ? err.message : 'Erro ao carregar dados do GitHub')
                        }
                  } finally {
                        setLoading(false)
                  }
            }
            load()
      }, [])

      if (loading) return <p className="text-zinc-500 text-sm">Carregando dados do GitHub…</p>
      if (error) return <p className="text-red-400 text-sm">{error}</p>
      if (!data) return null

      const formattedUpdate = lastUpdated
            ? new Date(lastUpdated).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
            : ''

      return (
            <div className="max-w-4xl space-y-12">
                  <div>
                        <h1 className="text-2xl font-bold mb-1">Códigos</h1>
                        <p className="text-zinc-400 text-sm">Tudo que consumo direto da API do GitHub.</p>
                        <p className="text-xs text-zinc-500 mt-2">
                              Atualizado em {formattedUpdate}
                              {isStale && <span className="text-amber-500 ml-2">(dados podem estar desatualizados — limite de requisições atingido)</span>}
                        </p>
                  </div>

                  {data.org && (
                        <section>
                              <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Comunidade</h2>
                              <div className="flex items-center gap-4 bg-zinc-900/40 rounded-xl p-4">
                                    <img src={data.org.avatar_url} alt={data.org.name ?? data.org.login} className="w-12 h-12 rounded-lg" />
                  <div>
                        <p className="text-sm font-medium">{data.org.name ?? data.org.login}</p>
                        <p className="text-xs text-zinc-500">{data.org.description}</p>
                        <a href={data.org.html_url} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-300 hover:text-white underline underline-offset-2">
                              Ver no GitHub
                        </a>
                  </div>
            </div>
      </section>
      )}

      
                  <section>
                        <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Repositórios ({data.repos.length})</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {data.repos.map((repo) => (
                                    <div key={repo.id} className="bg-zinc-900/40 rounded-xl p-4">
                                          <p className="text-sm font-medium">{repo.name}</p>
                                          <p className="text-xs text-zinc-500 mt-1 mb-3 line-clamp-2">{repo.description}</p>
                                          <div className="flex flex-wrap gap-3">
                                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-300 hover:text-white underline underline-offset-2">
                                                      Repositório
                                                </a>
                                                {hasProductionLink(repo) && (
                                                      <a href={repo.homepage!} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                                                            Produção
                                                      </a>
                                                )}
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </section>

                  <section>
                        <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Em progresso ({data.issues.length})</h2>
                        {data.issues.length === 0 ? (
                              <p className="text-sm text-zinc-500">Nada em progresso nas Especiais agora.</p>
                        ) : (
                              <div className="space-y-2">
                                    {data.issues.map((issue) => (
                                          <a key={issue.id} href={issue.html_url} target="_blank" rel="noopener noreferrer" className="block bg-zinc-900/40 rounded-lg px-4 py-2 hover:bg-zinc-900/70 transition-colors">
                                                <p className="text-sm">{issue.title}</p>
                                                <p className="text-xs text-zinc-500">{issue.repository} · #{issue.number}</p>
                                          </a>
                                    ))}
                              </div>
                        )}
                  </section>


                  <section>
                        <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Gists ({data.gists.length})</h2>
                        <div className="space-y-2">
                              {data.gists.map((gist) => (
                                    <a key={gist.id} href={gist.html_url} target="_blank" rel="noopener noreferrer" className="block bg-zinc-900/40 rounded-lg px-4 py-2 hover:bg-zinc-900/70 transition-colors">
                                          <p className="text-sm">{gist.description || Object.keys(gist.files)[0]}</p>
                                    </a>
                              ))}
                        </div>
                  </section>

            </div>
      )
}