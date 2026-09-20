import { forwardRef } from 'react'
import { resumeData } from '../model/resume.data'

/**
 * Documento de impressão (PDF) — uma página.
 *
 * Estratégia: cinco experiências em detalhe (as que sustentam a vaga-alvo) e
 * todo o restante da trajetória condensado em um parágrafo, preservando a
 * continuidade desde 2009 sem gastar espaço.
 *
 * Coluna única, alinhamento à esquerda, sem cor de fundo e sem ícones — as três
 * condições que mantêm o PDF legível por sistemas de triagem (ATS).
 */

/** Experiências que aparecem detalhadas. A ordem aqui é a ordem impressa. */
const PDF_FULL = [
  'volta-express',
  'byteclass',
  'mysa',
  'abc-construcao',
  'nvoip-dev',
] as const

/** Máximo de entregas por experiência no PDF. */
const MAX_BULLETS = 3

export const CurriculumPrintTemplate = forwardRef<HTMLDivElement>((_, ref) => {
  const contactLine = [resumeData.location, ...resumeData.contacts.map((c) => c.value)].join(
    '  ·  ',
  )

  const detailed = PDF_FULL.map((id) => resumeData.experiences.find((e) => e.id === id)).filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  )

  const condensed = resumeData.experiences
    .filter((e) => !PDF_FULL.includes(e.id as (typeof PDF_FULL)[number]))
    .filter((e) => e.id !== 'transicao')
    .map((e) => `${e.company} — ${e.role} (${e.period})`)
    .join('  ·  ')

  return (
    <div className="cv-print-wrapper">
      <div ref={ref} className="cv-doc">
        <header className="cv-header">
          <h1>{resumeData.name}</h1>
          <p className="cv-role">{resumeData.headline}</p>
          <p className="cv-contact">{contactLine}</p>
        </header>

        <section className="cv-section">
          <h2>Resumo</h2>
          <p className="cv-text">{resumeData.summary}</p>
        </section>

        <section className="cv-section">
          <h2>Experiência profissional</h2>
          {detailed.map((exp) => (
            <div key={exp.id} className="cv-entry">
              <p className="cv-entry-title">
                {exp.role} — {exp.company}
                <span className="cv-entry-period">{exp.period}</span>
              </p>
              {exp.context && <p className="cv-text">{exp.context}</p>}
              {exp.deliverables && (
                <ul className="cv-list">
                  {exp.deliverables.slice(0, MAX_BULLETS).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Trajetória anterior</h2>
          <p className="cv-text cv-compact">{condensed}</p>
        </section>

        <section className="cv-section">
          <h2>Formação</h2>
          {resumeData.education.map((item) => (
            <p key={item.id} className="cv-line">
              <strong>{item.degree}</strong> — {item.institution} ({item.period}
              {item.note ? `, ${item.note}` : ''})
            </p>
          ))}
        </section>

        <section className="cv-section">
          <h2>Certificações</h2>
          {resumeData.certifications.map((item) => (
            <p key={item.id} className="cv-line">
              <strong>{item.title}</strong> — {item.issuer} ({item.period})
            </p>
          ))}
        </section>

        <section className="cv-section">
          <h2>Comunidade</h2>
          {resumeData.community.map((item) => (
            <p key={item.id} className="cv-line">
              <strong>{item.title}</strong> ({item.period}){' '}
              {item.pdfDetail ?? item.detail ?? ''}
            </p>
          ))}
        </section>

        <section className="cv-section cv-section-last">
          <h2>Idiomas</h2>
          <p className="cv-line">
            {resumeData.languages.map((l) => `${l.language}: ${l.level}`).join('  ·  ')}
          </p>
        </section>
      </div>
    </div>
  )
})

CurriculumPrintTemplate.displayName = 'CurriculumPrintTemplate'