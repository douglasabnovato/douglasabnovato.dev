import { useEffect, useState } from 'react'
import {
      fetchGithubRepos,
      fetchOpenIssuesForRepo,
      fetchGists,
      fetchOrgInfo,
      hasProductionLink,
} from '@/entities/github/api/githubApi'
import type { GithubRepo, GithubIssue, GithubGist, GithubOrg } from '@/entities/github/model/types'

const ESPECIAIS_REPOS = ['learn-tech', 'bootcamps', 'tools', 'career']

export const Codigos = () => {
      const [repos, setRepos] = useState<GithubRepo[]>([])
      const [issues, setIssues] = useState<GithubIssue[]>([])
      const [gists, setGists] = useState<GithubGist[]>([])
      const [org, setOrg] = useState<GithubOrg | null>(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState<string | null>(null)

      useEffect(() => {
            async function loadAll() {
                  try {
                        const [reposData, issuesLists, gistsData, orgData] = await Promise.all([
                              fetchGithubRepos(),
                              Promise.all(ESPECIAIS_REPOS.map((repo) => fetchOpenIssuesForRepo(repo))),
                              fetchGists(),
                              fetchOrgInfo(),
                        ])
                        setRepos(reposData)
                        setIssues(issuesLists.flat())
                        setGists(gistsData)
                        setOrg(orgData)
                  } catch (err) {
                        setError(err instanceof Error ? err.message : 'Erro ao carregar dados do GitHub')
                  } finally {
                        setLoading(false)
                  }
            }
            loadAll()
      }, [])

      if (loading) return <p className="text-zinc-500 text-sm">Carregando dados do GitHub…</p>
      if (error) return <p className="text-red-400 text-sm">{error}</p>

      return (
            <div className="max-w-4xl space-y-12">
                  <div>
                        <h1 className="text-2xl font-bold mb-1">Códigos</h1>
                        <p className="text-zinc-400 text-sm">Todo que consumo direto da API do GitHub.</p>
                  </div>

                  {org && (
                        <section>
                              <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Comunidade</h2>
                              <div className="flex items-center gap-4 bg-zinc-900/40 rounded-xl p-4">
                                    <img src={org.avatar_url} alt={org.name ?? org.login} className="w-12 h-12 rounded-lg" />
                                    <div>
                                          <p className="text-sm font-medium">{org.name ?? org.login}</p>
                                          <p className="text-xs text-zinc-500">{org.description}</p>
                                          <a href={org.html_url} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-300 hover:text-white underline underline-offset-2">
                                                Ver no GitHub
                                          </a>
                                    </div>
                              </div>
                        </section>
                  )}

                  <section>
                        <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Repositórios ({repos.length})</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {repos.map((repo) => (
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
                        <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Em progresso ({issues.length})</h2>
                        {issues.length === 0 ? (
                              <p className="text-sm text-zinc-500">Nada em progresso nas Especiais agora.</p>
                        ) : (
                              <div className="space-y-2">
                                    {issues.map((issue) => (
                                          <a key={issue.id} href={issue.html_url} target="_blank" rel="noopener noreferrer" className="block bg-zinc-900/40 rounded-lg px-4 py-2 hover:bg-zinc-900/70 transition-colors">
                                                <p className="text-sm">{issue.title}</p>
                                                <p className="text-xs text-zinc-500">{issue.repository} · #{issue.number}</p>
                                          </a>
                                    ))}
                              </div>
                        )}
                  </section>



                  <section>
                        <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Gists ({gists.length})</h2>
                        <div className="space-y-2">
                              {gists.map((gist) => (
                                    <a key={gist.id} href={gist.html_url} target="_blank" rel="noopener noreferrer" className="block bg-zinc-900/40 rounded-lg px-4 py-2 hover:bg-zinc-900/70 transition-colors">
                                          <p className="text-sm">{gist.description || Object.keys(gist.files)[0]}</p>
                                    </a>
                              ))}
                        </div>
                  </section>

            </div>
      )
}