import { useEffect, useMemo, useRef, useState } from 'react'
import { Lock, Download, ExternalLink, ArrowUpRight } from 'lucide-react'

import { useResumeAccess } from '@/entities/resume/model/useResumeAccess'
import { CurriculumAccessModal } from '@/entities/resume/ui/CurriculumAccessModal'
import { CurriculumPrintTemplate } from '@/entities/resume/ui/CurriculumPrintTemplate'
import { resumeData } from '@/entities/resume/model/resume.data'
import { TRACK_LABEL, TRACK_VAR } from '@/entities/resume/model/types'
import type { Experience, TrackId } from '@/entities/resume/model/types'
import { fetchGithubRepos, hasProductionLink } from '@/entities/github/api/githubApi'
import { getCachedData, getStaleData, setCachedData } from '@/shared/lib/localCache'
import profileImg from '@/assets/home/1-profile.jpg'
import '@/entities/resume/ui/curriculo-print.css'

/* ------------------------------------------------------------------ */
/* Dados ao vivo do GitHub                                             */
/* ------------------------------------------------------------------ */

interface GithubSummary {
  repos: number
  production: number
  languages: { name: string; count: number }[]
}

const GITHUB_CACHE_KEY = 'curriculo:github-summary'

const useGithubSummary = () => {
  const [summary, setSummary] = useState<GithubSummary | null>(null)
  const [state, setState] = useState<'loading' | 'ok' | 'stale' | 'error'>('loading')

  useEffect(() => {
    let active = true

    const cached = getCachedData<GithubSummary>(GITHUB_CACHE_KEY)
    if (cached) {
      setSummary(cached.data)
      setState('ok')
      return
    }

    fetchGithubRepos()
      .then((repos) => {
        if (!active) return
        const counts = new Map<string, number>()
        repos.forEach((repo) => {
          if (!repo.language) return
          counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
        })
        const next: GithubSummary = {
          repos: repos.length,
          production: repos.filter(hasProductionLink).length,
          languages: [...counts.entries()]
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count),
        }
        setCachedData(GITHUB_CACHE_KEY, next)
        setSummary(next)
        setState('ok')
      })
      .catch(() => {
        if (!active) return
        const stale = getStaleData<GithubSummary>(GITHUB_CACHE_KEY)
        if (stale) {
          setSummary(stale.data)
          setState('stale')
        } else {
          setState('error')
        }
      })

    return () => {
      active = false
    }
  }, [])

  return { summary, state }
}

/* ------------------------------------------------------------------ */
/* Utilitários de tempo                                                */
/* ------------------------------------------------------------------ */

const toMonthIndex = (ym: string) => {
  const [year, month] = ym.split('-').map(Number)
  return year * 12 + (month - 1)
}

/* ------------------------------------------------------------------ */
/* Peças de interface                                                  */
/* ------------------------------------------------------------------ */

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="block text-[10px] font-mono uppercase tracking-[0.14em] text-muted">
    {children}
  </span>
)

const SectionHead = ({ title, note }: { title: string; note?: string }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-default pb-2 mb-6">
    <h2 className="text-[11px] font-mono uppercase tracking-[0.14em] text-secondary">{title}</h2>
    {note && <span className="text-[10px] font-mono text-muted text-right">{note}</span>}
  </div>
)

const TrackDot = ({ track }: { track: TrackId }) => (
  <span
    aria-hidden
    className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
    style={{ backgroundColor: TRACK_VAR[track] }}
  />
)

/* ------------------------------------------------------------------ */
/* Zona 3 — faixa temporal                                             */
/* ------------------------------------------------------------------ */

const CareerTimeline = () => {
  const dated = useMemo(
    () =>
      resumeData.experiences
        .filter((e): e is Experience & { start: string } => Boolean(e.start))
        .slice()
        .sort((a, b) => toMonthIndex(a.start) - toMonthIndex(b.start)),
    [],
  )

  const now = new Date()
  const endIndex = now.getFullYear() * 12 + now.getMonth()
  const startIndex = resumeData.careerStart * 12
  const span = Math.max(endIndex - startIndex + 1, 1)

  const years = useMemo(() => {
    const out: number[] = []
    for (let y = resumeData.careerStart; y <= now.getFullYear(); y += 3) out.push(y)
    return out
  }, [now])

  const tracks = useMemo(() => {
    const seen: TrackId[] = []
    dated.forEach((e) => {
      if (!seen.includes(e.track)) seen.push(e.track)
    })
    return seen
  }, [dated])

  return (
    <section className="mb-16">
      <SectionHead
        title="Faixa temporal"
        note={`${resumeData.careerStart} — hoje · ${dated.length} vínculos`}
      />

      {/* eixo */}
      <div className="hidden sm:grid grid-cols-[9rem_1fr] gap-3 mb-2">
        <span />
        <div className="relative h-4">
          {years.map((y) => (
            <span
              key={y}
              className="absolute top-0 text-[10px] font-mono text-muted tabular-nums -translate-x-1/2"
              style={{ left: `${((y * 12 - startIndex) / span) * 100}%` }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-[3px]">
        {dated.map((exp) => {
          const from = toMonthIndex(exp.start)
          const to = exp.end ? toMonthIndex(exp.end) : endIndex
          const left = ((from - startIndex) / span) * 100
          const width = Math.max(((to - from + 1) / span) * 100, 0.7)

          return (
            <div
              key={exp.id}
              className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-x-3 items-center group"
            >
              <span className="text-[10px] font-mono text-muted truncate group-hover:text-secondary">
                {exp.company}
              </span>
              <div className="relative h-4">
                <span
                  title={`${exp.company} — ${exp.role} · ${exp.period}`}
                  className="absolute top-1/2 -translate-y-1/2 h-[6px] rounded-full"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    backgroundColor: TRACK_VAR[exp.track],
                    opacity: exp.track === 'transicao' ? 0.45 : 0.85,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 pt-4 border-t border-default">
        {tracks.map((track) => (
          <span key={track} className="flex items-center gap-2 text-[10px] font-mono text-muted">
            <TrackDot track={track} />
            {TRACK_LABEL[track]}
          </span>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Zona 4 — experiência                                                */
/* ------------------------------------------------------------------ */

const ExperienceFull = ({ exp }: { exp: Experience }) => (
  <article className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-x-6 gap-y-2 py-7 border-t border-default first:border-t-0">
    <div className="md:pt-1">
      <span className="text-[10px] font-mono text-muted tabular-nums">{exp.period}</span>
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <TrackDot track={exp.track} />
        <h3 className="text-base font-medium text-primary">{exp.role}</h3>
      </div>
      <p className="text-sm text-secondary mb-3">{exp.company}</p>

      {exp.context && (
        <p className="text-sm text-muted leading-relaxed mb-3 max-w-2xl">{exp.context}</p>
      )}

      {exp.deliverables && (
        <ul className="space-y-1.5 max-w-2xl">
          {exp.deliverables.map((item) => (
            <li key={item} className="text-sm text-secondary leading-relaxed flex gap-2.5">
              <span className="text-muted select-none">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {exp.stack && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4">
          {exp.stack.map((tool) => (
            <span key={tool} className="text-[10px] font-mono text-muted">
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  </article>
)

const ExperienceMedium = ({ exp }: { exp: Experience }) => (
  <article className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-x-6 gap-y-1 py-5 border-t border-default">
    <span className="text-[10px] font-mono text-muted tabular-nums md:pt-1">{exp.period}</span>
    <div>
      <div className="flex items-center gap-2">
        <TrackDot track={exp.track} />
        <h3 className="text-sm font-medium text-primary">{exp.role}</h3>
      </div>
      <p className="text-xs text-secondary mb-2">{exp.company}</p>
      {exp.context && (
        <p className="text-xs text-muted leading-relaxed max-w-2xl">{exp.context}</p>
      )}
      {exp.deliverables && (
        <ul className="mt-1.5 space-y-1 max-w-2xl">
          {exp.deliverables.map((item) => (
            <li key={item} className="text-xs text-secondary leading-relaxed flex gap-2">
              <span className="text-muted select-none">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </article>
)

const ExperienceLine = ({ exp }: { exp: Experience }) => (
  <div className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-x-6 py-2.5 border-t border-default">
    <span className="text-[10px] font-mono text-muted tabular-nums">{exp.period}</span>
    <div className="flex flex-wrap items-baseline gap-x-2">
      <TrackDot track={exp.track} />
      <span className="text-xs text-primary">{exp.role}</span>
      <span className="text-xs text-muted">· {exp.company}</span>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
/* Zona 5 — evidência técnica                                          */
/* ------------------------------------------------------------------ */

const GithubLanguages = ({
  summary,
  state,
}: {
  summary: GithubSummary | null
  state: 'loading' | 'ok' | 'stale' | 'error'
}) => {
  const top = summary?.languages.slice(0, 8) ?? []
  const max = top.length ? top[0].count : 1

  return (
    <div>
      <SectionHead
        title="Repositórios por linguagem principal"
        note={state === 'stale' ? 'dados em cache' : 'API do GitHub'}
      />
      {state === 'loading' && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 rounded bg-surface animate-pulse" />
          ))}
        </div>
      )}
      {state === 'error' && (
        <p className="text-xs text-muted">
          Limite de requisições da API do GitHub atingido. Os dados voltam em alguns minutos.
        </p>
      )}
      {top.length > 0 && (
        <ul className="space-y-2.5">
          {top.map((lang) => (
            <li key={lang.name} className="grid grid-cols-[7rem_1fr_2rem] items-center gap-3">
              <span className="text-xs text-secondary truncate">{lang.name}</span>
              <span className="h-[6px] rounded-full bg-surface overflow-hidden">
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: `${(lang.count / max) * 100}%` }}
                />
              </span>
              <span className="text-[10px] font-mono text-muted tabular-nums text-right">
                {lang.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const ToolEvidence = () => {
  const rows = useMemo(() => {
    const map = new Map<string, { company: string; period: string }[]>()
    resumeData.experiences.forEach((exp) => {
      exp.stack?.forEach((tool) => {
        const list = map.get(tool) ?? []
        list.push({ company: exp.company, period: exp.period })
        map.set(tool, list)
      })
    })
    return [...map.entries()]
  }, [])

  return (
    <div>
      <SectionHead title="Tecnologias por evidência" note="onde cada uma foi usada" />
      <ul className="space-y-2.5">
        {rows.map(([tool, uses]) => (
          <li key={tool} className="grid grid-cols-[9rem_1fr] gap-3 items-baseline">
            <span className="text-xs font-mono text-primary truncate">{tool}</span>
            <span className="text-[11px] text-muted leading-relaxed">
              {uses.map((u) => `${u.company} (${u.period})`).join(' · ')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export const Curriculo = () => {
  const { isAuthorized } = useResumeAccess()
  const [showModal, setShowModal] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)
  const { summary, state: githubState } = useGithubSummary()

  if (!isAuthorized()) {
    return (
      <div className="max-w-md mx-auto py-24 px-4">
        <div className="w-9 h-9 rounded-md border border-default bg-surface flex items-center justify-center mb-6">
          <Lock size={15} className="text-muted" />
        </div>
        <h1 className="text-xl font-medium text-primary mb-3">Currículo restrito</h1>
        <p className="text-sm text-secondary leading-relaxed mb-8">
          Este documento reúne o histórico profissional completo, com nomes de empresas, períodos e
          dados de contato. O acesso é liberado mediante identificação.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-default bg-surface text-xs font-mono text-primary hover:border-accent hover:text-accent transition-colors cursor-pointer"
        >
          Solicitar acesso <ArrowUpRight size={13} />
        </button>
        {showModal && <CurriculumAccessModal onClose={() => setShowModal(false)} />}
      </div>
    )
  }

  const full = resumeData.experiences.filter((e) => e.depth === 'full')
  const medium = resumeData.experiences.filter((e) => e.depth === 'medium')
  const line = resumeData.experiences.filter((e) => e.depth === 'line')

  const figureValue = (id: string, fallback?: string) => {
    if (id === 'repos') return summary ? String(summary.repos) : '—'
    if (id === 'producao') return summary ? String(summary.production) : '—'
    return fallback ?? '—'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 text-primary">
      <main className="no-print">
        {/* ZONA 1 — identidade */}
        <header className="flex flex-col sm:flex-row sm:items-start gap-6 pb-10 border-b border-default">
          <img
            src={profileImg}
            alt={resumeData.name}
            className="w-14 h-14 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <Label>Currículo</Label>
            <h1 className="text-2xl font-medium tracking-tight mt-1.5">{resumeData.name}</h1>
            <p className="text-sm text-secondary mt-1">
              {resumeData.headline} · {resumeData.location}
            </p>
            <p className="text-sm text-muted leading-relaxed mt-3 max-w-2xl">
              {resumeData.summary}
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-default bg-surface text-[11px] font-mono text-secondary hover:border-accent hover:text-accent transition-colors cursor-pointer shrink-0"
          >
            <Download size={13} /> PDF
          </button>
        </header>

        {/* ZONA 2 — números verificáveis */}
        <section className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[color:var(--color-border)] border-b border-default">
          {resumeData.figures.map((fig) => (
            <div key={fig.id} className="px-4 py-6 first:pl-0">
              <span className="block text-3xl font-mono tabular-nums text-primary">
                {figureValue(fig.id, fig.value)}
              </span>
              <span className="block text-[11px] text-secondary mt-2 leading-snug">
                {fig.label}
              </span>
              <span className="block text-[10px] font-mono text-muted mt-1">{fig.source}</span>
            </div>
          ))}
        </section>

        <div className="py-14">
          <CareerTimeline />

          {/* ZONA 4 — experiência */}
          <section className="mb-16">
            <SectionHead title="Experiência" note="detalhe decrescente por relevância e recência" />
            <div>
              {full.map((exp) => (
                <ExperienceFull key={exp.id} exp={exp} />
              ))}
            </div>
            <div className="mt-8">
              {medium.map((exp) => (
                <ExperienceMedium key={exp.id} exp={exp} />
              ))}
            </div>
            <div className="mt-8">
              {line.map((exp) => (
                <ExperienceLine key={exp.id} exp={exp} />
              ))}
            </div>
          </section>

          {/* ZONA 5 — evidência técnica */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-14 mb-16">
            <GithubLanguages summary={summary} state={githubState} />
            <ToolEvidence />
          </section>

          {/* ZONA 6 — formação, comunidade, publicação */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
            <div>
              <SectionHead title="Formação" />
              <ul className="space-y-5">
                {resumeData.education.map((item) => (
                  <li key={item.id}>
                    <p className="text-sm text-primary leading-snug">{item.degree}</p>
                    <p className="text-xs text-secondary mt-0.5">{item.institution}</p>
                    <p className="text-[10px] font-mono text-muted mt-1 tabular-nums">
                      {item.period}
                      {item.note ? ` · ${item.note}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-default">
                <Label>Certificações</Label>
                <ul className="mt-3 space-y-3">
                  {resumeData.certifications.map((item) => (
                    <li key={item.id}>
                      <p className="text-xs text-primary leading-snug">{item.title}</p>
                      <p className="text-[10px] font-mono text-muted mt-0.5 tabular-nums">
                        {item.issuer} · {item.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <SectionHead title="Comunidade" />
              <ul className="space-y-5">
                {resumeData.community.map((item) => (
                  <li key={item.id}>
                    <p className="text-sm text-primary leading-snug">{item.title}</p>
                    {item.role && <p className="text-xs text-secondary mt-0.5">{item.role}</p>}
                    <p className="text-[10px] font-mono text-muted mt-1 tabular-nums">
                      {item.period}
                    </p>
                    {item.detail && (
                      <p className="text-xs text-muted leading-relaxed mt-1.5">{item.detail}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHead title="Publicação e idiomas" />
              <ul className="space-y-5">
                {resumeData.publications.map((item) => (
                  <li key={item.id}>
                    <p className="text-sm text-primary leading-snug">{item.title}</p>
                    <p className="text-[10px] font-mono text-muted mt-1 tabular-nums">
                      {item.period}
                    </p>
                    {item.detail && (
                      <p className="text-xs text-muted leading-relaxed mt-1.5">{item.detail}</p>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-secondary hover:text-accent transition-colors mt-1.5"
                      >
                        abrir <ExternalLink size={11} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 pt-5 border-t border-default space-y-1.5">
                {resumeData.languages.map((lang) => (
                  <li key={lang.id} className="flex justify-between text-xs">
                    <span className="text-secondary">{lang.language}</span>
                    <span className="font-mono text-muted">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ZONA 7 — contato */}
          <section className="pt-10 border-t border-default">
            <SectionHead title="Contato" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {resumeData.contacts.map((contact) => (
                <li key={contact.id}>
                  <Label>{contact.label}</Label>
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm text-secondary hover:text-accent transition-colors break-all"
                  >
                    {contact.value}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <CurriculumPrintTemplate ref={printRef} />
    </div>
  )
}
