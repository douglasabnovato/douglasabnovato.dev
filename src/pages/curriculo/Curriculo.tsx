import { useState, useRef } from 'react';
import { resumeData } from '@/entities/resume/model/resume.data';
import { useResumeAccess } from '@/entities/resume/model/useResumeAccess';
import { CurriculumAccessModal } from '@/entities/resume/ui/CurriculumAccessModal';
import { PdfExportButton } from '@/entities/resume/ui/PdfExportButton';
import { ExperienceBlock } from '@/entities/resume/ui/ExperienceBlock';
import { Lock } from 'lucide-react';
import '@/entities/resume/ui/curriculo-print.css';

export const Curriculo = () => {
  const { isAuthorized } = useResumeAccess();
  const [showModal, setShowModal] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const atual = resumeData.experiences.filter((e) => e.tier === 'atual');
  const recente = resumeData.experiences.filter((e) => e.tier === 'recente');
  const condensado = resumeData.experiences.filter((e) => e.tier === 'condensado');

  // Se o usuário não estiver autorizado, exibe a barreira de acesso restrito
  if (!isAuthorized()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-zinc-800/50 border border-zinc-700 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Lock size={30} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-3">Currículo Privado</h1>
        <p className="text-secondary mb-8 max-w-md text-sm leading-relaxed">
          Este documento contém informações profissionais detalhadas. Para prosseguir com a leitura, por favor solicite o acesso rápido.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-lg font-bold text-sm transition-all shadow-lg cursor-pointer"
        >
          Solicitar Acesso
        </button>
        {showModal && <CurriculumAccessModal onClose={() => setShowModal(false)} />}
      </div>
    );
  }

  // Se autorizado, renderiza o currículo completo original
  return (
    <div className="max-w-4xl pb-16">
      {/* HEADER RESPONSIVO (Nome, Headline e Botão Organizados) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-default">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">{resumeData.name}</h1>
          <p className="text-secondary text-xs sm:text-sm mt-1 leading-relaxed">{resumeData.headline}</p>
        </div>
        <div className="self-start sm:self-auto">
          <PdfExportButton targetRef={printRef} fileName="douglas-novato-curriculo" />
        </div>
      </div>

      {/* ÁREA DO CURRÍCULO (Grid Otimizado) */}
      <div ref={printRef} className="curriculo-print-area grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ASIDE / COLUNA LATERAL */}
        <aside className="md:col-span-1 space-y-6">
          <div className="p-4 rounded-lg bg-surface border border-default">
            <h2 className="text-[11px] uppercase tracking-widest font-mono text-accent mb-2">Resumo</h2>
            <p className="text-xs text-secondary leading-relaxed">{resumeData.summary}</p>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-default">
            <h2 className="text-[11px] uppercase tracking-widest font-mono text-accent mb-3">Formação</h2>
            <ul className="space-y-3">
              {resumeData.education.map((edu) => (
                <li key={edu.id} className="text-xs cv-entry border-b border-default/40 pb-2.5 last:border-0 last:pb-0">
                  <p className="font-semibold text-primary">{edu.institution}</p>
                  <p className="text-secondary cv-muted mt-0.5">{edu.degree}</p>
                  <p className="text-[11px] font-mono text-muted cv-muted mt-1">
                    {edu.period}{!edu.completed ? ' · em andamento' : ''}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-default">
            <h2 className="text-[11px] uppercase tracking-widest font-mono text-accent mb-3">Trajetória</h2>
            <ul className="space-y-2.5">
              {condensado.map((exp) => (
                <li key={exp.id} className="text-xs text-secondary cv-muted cv-entry leading-relaxed">
                  <span className="font-mono text-[10px] text-accent block">{exp.period}</span>
                  <span className="text-primary font-medium">{exp.role}</span>
                  <span className="text-muted"> — {exp.company}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL (Experiências Atuais e Recentes) */}
        <div className="md:col-span-2 space-y-8">
          <div className="p-4 sm:p-6 rounded-lg bg-surface border border-default">
            <ExperienceBlock title="Atual" experiences={atual} />
          </div>
          <div className="p-4 sm:p-6 rounded-lg bg-surface border border-default">
            <ExperienceBlock title="Experiência recente" experiences={recente} />
          </div>
        </div>

      </div>
    </div>
  );
};