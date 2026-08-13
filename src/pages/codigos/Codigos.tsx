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
import { GitFork, Star, ExternalLink, GitBranch, Code2, AlertCircle, Clock, FileCode, CheckCircle2 } from 'lucide-react'

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
        const fresh: CodigosData = { repos: reposData, issues: issuesLists.flat(), gists: gistsData, org: orgData }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted text-sm font-mono animate-pulse">Sincronizando dados direto da API do GitHub…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
        {error}
      </div>
    )
  }

  if (!data) return null

  const formattedUpdate = lastUpdated
    ? new Date(lastUpdated).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <div className="max-w-4xl space-y-12 pb-16">
      {/* HEADER REFINADO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-default">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono text-accent px-2 py-0.5 rounded border border-accent/20 bg-accent/5">
              Live API Sync
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Códigos & Repositórios</h1>
          <p className="text-secondary text-sm mt-1">
            Monitoramento em tempo real do ecossistema de código aberto e métricas extraídas via GitHub API.
          </p>
          <p className="text-xs text-muted mt-2 flex items-center gap-1.5 font-mono">
            <Clock size={12} /> Atualizado em {formattedUpdate}
            {isStale && <span className="text-amber-500 ml-2">(dados em cache — limite de requisições atingido)</span>}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-surface border border-default px-4 py-2.5 rounded-lg self-start md:self-auto font-mono text-xs">
          <div>
            <span className="text-muted block">Repositórios</span>
            <span className="font-bold text-primary text-sm">{data.repos.length}</span>
          </div>
          <div className="w-[1px] h-6 bg-default" />
          <div>
            <span className="text-muted block">Gists</span>
            <span className="font-bold text-primary text-sm">{data.gists.length}</span>
          </div>
        </div>
      </div>

      {/* COMUNIDADE / ORG */}
      {data.org && (
        <section>
          <h2 className="text-xs uppercase tracking-widest font-mono text-muted mb-4">Comunidade Organizacional</h2>
          <div className="flex items-center justify-between bg-surface border border-default rounded-xl p-5 hover:border-accent/50 transition-all">
            <div className="flex items-center gap-4">
              <img src={data.org.avatar_url} alt={data.org.name ?? data.org.login} className="w-14 h-14 rounded-lg border border-default object-cover" />
              <div>
                <p className="text-base font-bold text-primary">{data.org.name ?? data.org.login}</p>
                <p className="text-xs text-secondary mt-0.5 max-w-md">{data.org.description}</p>
              </div>
            </div>
            <a
              href={data.org.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded bg-surface-solid border border-default hover:border-accent text-primary transition-all"
            >
              <GitBranch size={14} /> Organização <ExternalLink size={12} />
            </a>
          </div>
        </section>
      )}

      {/* REPOSITÓRIOS COM CARDS RICOS */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-widest font-mono text-muted">Repositórios Públicos</h2>
          <span className="text-xs font-mono text-muted">{data.repos.length} total</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.repos.map((repo) => (
            <div
              key={repo.id}
              className="group relative bg-surface border border-default rounded-xl p-5 flex flex-col justify-between transition-all hover:border-accent"
            >
              <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-l" />

              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-accent shrink-0" />
                    <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  {repo.language && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-solid border border-default text-secondary">
                      {repo.language}
                    </span>
                  )}
                </div>

                <p className="text-xs text-secondary leading-relaxed mb-4 line-clamp-2">
                  {repo.description || 'Nenhuma descrição fornecida para este repositório.'}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4 pt-3 border-t border-default/50 text-xs font-mono text-muted">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400" /> {repo.stargazers_count || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} /> {repo.forks_count || 0}
                  </span>
                  {repo.updated_at && (
                    <span className="ml-auto text-[10px]">
                      Atualizado em {new Date(repo.updated_at).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded bg-surface-solid border border-default hover:border-accent text-primary transition-all"
                  >
                    <GitBranch size={12} /> Código <ExternalLink size={10} />
                  </a>
                  {hasProductionLink(repo) && (
                    <a
                      href={repo.homepage!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 transition-all"
                    >
                      <span>●</span> Produção <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ISSUES / EM PROGRESSO (2 POR LINHA COM MAIS INFORMAÇÕES) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-widest font-mono text-muted">Issues Ativas (Em Progresso)</h2>
          <span className="text-xs font-mono text-muted">{data.issues.length} ativas</span>
        </div>

        {data.issues.length === 0 ? (
          <div className="bg-surface border border-default rounded-xl p-6 text-center">
            <p className="text-sm text-muted font-mono">Nenhuma issue em progresso nas frentes especiais no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.issues.map((issue) => (
              <a
                key={issue.id}
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-surface border border-default rounded-xl p-5 flex flex-col justify-between hover:border-accent transition-all"
              >
                <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-l" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-solid border border-default text-accent font-semibold">
                      {issue.repository}
                    </span>
                    <span className="text-[10px] font-mono text-muted">
                      #{issue.number}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-primary group-hover:text-accent transition-colors line-clamp-2 leading-relaxed mb-4">
                    {issue.title}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-default/50 text-xs font-mono text-muted">
                  <span className="flex items-center gap-1.5 text-accent">
                    <AlertCircle size={13} /> Aberta no GitHub
                  </span>
                  <ExternalLink size={12} className="text-muted group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* GISTS (CARDS QUADRADOS EM GRID) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-widest font-mono text-muted">Gists & Snippets</h2>
          <span className="text-xs font-mono text-muted">{data.gists.length} total</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.gists.map((gist) => (
            <a
              key={gist.id}
              href={gist.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-surface border border-default rounded-xl p-4 flex flex-col justify-between hover:border-accent transition-all h-28"
            >
              <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-l" />

              <div className="flex items-start gap-2.5">
                <FileCode size={16} className="text-accent shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-primary group-hover:text-accent transition-colors line-clamp-3 leading-relaxed">
                  {gist.description || Object.keys(gist.files)[0]}
                </p>
              </div>

              <div className="flex items-center justify-end text-[10px] font-mono text-muted pt-2 border-t border-default/50">
                <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                  Ver Gist <ExternalLink size={10} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}