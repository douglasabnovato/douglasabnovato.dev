import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { resumeData } from '@/entities/resume/model/resume.data'
import { ecosystemData, homeIntro } from '@/entities/project/api/ecosystem.data'
import type { EcosystemItem } from '@/entities/project/api/ecosystem.data'
import { blogMeta } from '@/entities/article/api/blog.data'
import { fetchGithubRepos } from '@/entities/github/api/githubApi'
import { getCachedData, getStaleData, setCachedData } from '@/shared/lib/localCache'
import { channels, HANDLE } from '@/shared/config/channels'
import profileImg from '@/assets/home/1-profile.jpg'

/* ------------------------------------------------------------------ */
/* Sinal de atividade — vem da API do GitHub                           */
/* ------------------------------------------------------------------ */

type RepoDates = Record<string, string>

const ACTIVITY_CACHE_KEY = 'home:github-activity'

const useGithubActivity = () => {
  const [dates, setDates] = useState<RepoDates | null>(null)

  useEffect(() => {
    let active = true

    const cached = getCachedData<RepoDates>(ACTIVITY_CACHE_KEY)
    if (cached) {
      setDates(cached.data)
      return
    }

    fetchGithubRepos()
      .then((repos) => {
        if (!active) return
        const next: RepoDates = {}
        repos.forEach((repo) => {
          next[repo.name] = repo.updated_at
        })
        setCachedData(ACTIVITY_CACHE_KEY, next)
        setDates(next)
      })
      .catch(() => {
        if (!active) return
        const stale = getStaleData<RepoDates>(ACTIVITY_CACHE_KEY)
        if (stale) setDates(stale.data)
      })

    return () => {
      active = false
    }
  }, [])

  return dates
}

/** "hoje", "há 3 dias", "há 2 meses" — sem biblioteca. */
const relativeTime = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days <= 0) return 'hoje'
  if (days === 1) return 'ontem'
  if (days < 30) return `há ${days} dias`
  const months = Math.floor(days / 30)
  return months === 1 ? 'há 1 mês' : `há ${months} meses`
}

const mostRecent = (dates: RepoDates | null) => {
  if (!dates) return null
  const all = Object.values(dates)
  if (all.length === 0) return null
  return all.reduce((a, b) => (new Date(a) > new Date(b) ? a : b))
}

/* ------------------------------------------------------------------ */
/* Peças                                                               */
/* ------------------------------------------------------------------ */

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <span className="block text-[10px] font-mono uppercase tracking-[0.14em] text-muted">
    {children}
  </span>
)

const StatusTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded border border-default text-secondary">
    {children}
  </span>
)

const ItemLinks = ({ links }: { links: { label: string; url: string }[] }) => {
  const usable = links.filter((l) => l.url.trim().length > 0)
  if (usable.length === 0) return null
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {usable.map((link) => (
        <a
          key={link.url + link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-secondary hover:text-accent transition-colors"
        >
          {link.label}
          <ArrowUpRight size={12} />
        </a>
      ))}
    </div>
  )
}

const ChannelBand = ({ repos, artigos }: { repos: number | null; artigos: number }) => (
  <section className="mt-[var(--space-block)] pt-8 border-t border-default">
    <p className="text-xs text-muted">
      O mesmo identificador em todos:{' '}
      <span className="font-mono text-secondary">{HANDLE}</span>
    </p>

    <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
      {channels
        .filter((canal) => canal.active)
        .map((canal) => {
          const Icone = canal.icon
          const nota =
            canal.live === 'repos' && repos
              ? `${repos} ${canal.note}`
              : canal.live === 'artigos'
                ? `${artigos} ${canal.note}`
                : canal.note

          return (
            <a
              key={canal.id}
              href={canal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg border border-default bg-surface px-4 py-3.5 hover:border-accent transition-colors"
            >
              <Icone
                size={16}
                className="mt-0.5 shrink-0 text-muted group-hover:text-primary transition-colors"
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-xs font-medium text-primary group-hover:text-accent transition-colors">
                  {canal.label}
                  <ArrowUpRight
                    size={11}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </span>
                <span className="mt-0.5 block text-[10px] font-mono text-muted leading-snug break-words">
                  {nota}
                </span>
              </span>
            </a>
          )
        })}
    </div>
  </section>
)

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export const Home = () => {
  const dates = useGithubActivity()
  const currentRoles = resumeData.experiences.filter((e) => e.tier === 'atual')

  const destaque = ecosystemData.find((i) => i.level === 'destaque')
  const grupos = ecosystemData.filter((i) => i.level === 'grupo')
  const frentes = ecosystemData.filter((i) => i.level === 'frente')

  const latest = mostRecent(dates)
  const totalRepos = dates
    ? Object.keys(dates).filter((nome) => nome.toLowerCase() !== '.github').length
    : null
  const updatedFor = (item: { repo?: string }) =>
    item.repo && dates?.[item.repo] ? relativeTime(dates[item.repo]) : null

  return (
    <div className="max-w-4xl pb-24">
      {/* ---------- BLOCO 1 — abertura ---------- */}
      <header className="flex flex-col sm:flex-row sm:items-start gap-7">
        <img
          src={profileImg}
          alt="Douglas Antonio Braga Novato"
          width={112}
          height={112}
          className="w-28 h-28 rounded-full object-cover object-[center_30%] shrink-0"
        />

        <div className="min-w-0">
          <h1 className="text-[1.6rem] sm:text-[1.75rem] font-normal leading-snug tracking-tight text-primary">
            {homeIntro}
          </h1>

          <p className="mt-5 text-xs font-mono text-muted leading-relaxed">
            {currentRoles.map((role) => `${role.role} — ${role.company}`).join('  ·  ')}
          </p>

          {latest && (
            <p className="mt-4 text-[10px] font-mono text-muted">
              Último commit público {relativeTime(latest)}
            </p>
          )}
        </div>
      </header>

      {/* ---------- BLOCO 2 — destaque ---------- */}
      {destaque && (
        <section className="mt-[var(--space-block)]">
          <img
            src={destaque.image}
            alt={destaque.title}
            loading="lazy"
            decoding="async"
            className="w-full aspect-video object-cover object-top rounded-xl border border-default img-emph-1"
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4">
            <div className="lg:col-span-7">
              <Kicker>{destaque.kicker}</Kicker>
              <h2 className="mt-2 text-xl font-medium text-primary">{destaque.title}</h2>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                {destaque.description}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {destaque.note && (
                <p className="text-xs text-muted leading-relaxed border-l border-accent pl-3">
                  {destaque.note}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                {destaque.status && <StatusTag>{destaque.status}</StatusTag>}
                {updatedFor(destaque) && (
                  <span className="text-[10px] font-mono text-muted">
                    atualizado {updatedFor(destaque)}
                  </span>
                )}
              </div>
              <ItemLinks links={destaque.links} />
            </div>
          </div>
        </section>
      )}

      {/* ---------- BLOCO 3 — grupos (learnTECH) ---------- */}
      {grupos.map((grupo: EcosystemItem) => (
        <section key={grupo.id} className="mt-[var(--space-block)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 border-b border-default">
            <div>
              <Kicker>{grupo.kicker}</Kicker>
              <h2 className="mt-1.5 text-base font-medium text-primary">{grupo.title}</h2>
            </div>
            {grupo.status && <StatusTag>{grupo.status}</StatusTag>}
          </div>

          <p className="mt-4 text-sm text-secondary leading-relaxed max-w-xl">
            {grupo.description}
          </p>

          <div className="mt-[var(--space-group)] grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
            {grupo.children?.map((child) => (
              <a
                key={child.id}
                href={child.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <img
                  src={child.image}
                  alt={child.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[3/2] object-cover object-top rounded-md border border-default img-emph-3 group-hover:img-emph-1"
                />
                <p className="mt-3 text-sm text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                  {child.title}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </p>
                <p className="mt-0.5 text-[11px] text-muted leading-snug">{child.description}</p>
                {updatedFor(child) && (
                  <p className="mt-1 text-[10px] font-mono text-muted">
                    atualizado {updatedFor(child)}
                  </p>
                )}
              </a>
            ))}
          </div>
        </section>
      ))}

      {/* ---------- BLOCO 4 — frentes ---------- */}
      {frentes.length > 0 && (
        <section className="mt-[var(--space-block)]">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted pb-3 border-b border-default">
            Outras frentes
          </h2>

          <div className="mt-[var(--space-group)] grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
            {frentes.map((item) => (
              <article key={item.id} className="group">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[4/3] object-cover object-top rounded-md border border-default img-emph-2 group-hover:img-emph-1"
                  />
                )}
                <div className="mt-4">
                  <Kicker>{item.kicker}</Kicker>
                  <h3 className="mt-1.5 text-sm font-medium text-primary">{item.title}</h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">{item.description}</p>
                  <div className="mt-3">
                    <ItemLinks links={item.links} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      <ChannelBand repos={totalRepos} artigos={blogMeta.mediumTotal} />
    </div>
  )
}