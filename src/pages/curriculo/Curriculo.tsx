import { useState, useRef } from 'react';
import { useResumeAccess } from '@/entities/resume/model/useResumeAccess';
import { CurriculumAccessModal } from '@/entities/resume/ui/CurriculumAccessModal';
import { PdfExportButton } from '@/entities/resume/ui/PdfExportButton';
import { CurriculumPrintTemplate } from '@/entities/resume/ui/CurriculumPrintTemplate';
import {
  Lock, Sparkles, MapPin, Phone, Mail, GraduationCap, Award,
  ExternalLink, Code2, Cpu, Database, Cloud, Terminal, HeartHandshake, BookOpen, Layers, Globe
} from 'lucide-react';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Radar, Doughnut } from 'react-chartjs-2';
import '@/entities/resume/ui/curriculo-print.css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
);

export const Curriculo = () => {
  const { isAuthorized } = useResumeAccess();
  const [showModal, setShowModal] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Configuração Chart.js - Radar
  const radarData = {
    labels: [
      ['Frontend Reativo', '(React, Vue, TS)'],
      ['Backend & APIs', '(Node, Express, Laravel)'],
      ['Bancos de Dados', '(SQL, Supabase, Mongo)'],
      ['CRM & Growth', '(Salesforce SFMC)'],
      ['Coordenação &', 'EdTech (ByteClass)'],
      ['Arquitetura de', 'Produtos Digitais'],
    ],
    datasets: [
      {
        label: 'Proficiência (%)',
        data: [95, 90, 88, 88, 95, 92],
        backgroundColor: 'rgba(56, 189, 248, 0.25)',
        borderColor: '#38bdf8',
        borderWidth: 2,
        pointBackgroundColor: '#0284c7',
        pointBorderColor: '#ffffff',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#27272a' },
        grid: { color: '#27272a' },
        pointLabels: {
          font: { family: 'Plus Jakarta Sans, sans-serif', size: 10, weight: 700 as const },
          color: '#e4e4e7',
        },
        ticks: { display: false },
        min: 0,
        max: 100,
      },
    },
    plugins: { legend: { display: false } },
  };

  // Configuração Chart.js - Doughnut
  const donutData = {
    labels: [
      ['Engenharia & Dev', 'Fullstack MERN/TS'],
      ['Coordenação Tech &', 'Ensino (ByteClass)'],
      ['Salesforce CRM &', 'Growth (Grupo MYSA)'],
      ['Suporte Técnico,', 'Processos & Gestão'],
    ],
    datasets: [
      {
        data: [35, 30, 20, 15],
        backgroundColor: ['#0284c7', '#4f46e5', '#06b6d4', '#64748b'],
        borderWidth: 2,
        borderColor: '#18181b',
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: { family: 'Plus Jakarta Sans, sans-serif', size: 10, weight: 600 as const },
          color: '#a1a1aa',
          padding: 12,
        },
      },
    },
  };

  if (!isAuthorized()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-zinc-800/60 border border-zinc-700/80 rounded-2xl flex items-center justify-center mb-6 shadow-xl backdrop-blur-md">
          <Lock size={28} className="text-sky-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Currículo Privado</h1>
        <p className="text-zinc-400 mb-8 max-w-md text-sm leading-relaxed">
          Este documento contém informações profissionais e métricas detalhadas da trajetória técnica. Solicite o acesso direto para visualizar.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-lg shadow-sky-500/10 cursor-pointer flex items-center gap-2"
        >
          <Sparkles size={16} />
          <span>Solicitar Acesso</span>
        </button>
        {showModal && <CurriculumAccessModal onClose={() => setShowModal(false)} />}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 text-zinc-100">

      {/* CABEÇALHO DA PÁGINA DIGITAL */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800/80 pb-6 no-print">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md">
            DG
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">Currículo</h1>
            <p className="text-xs text-sky-400 font-semibold">A jornada da minha carreira</p>
          </div>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-3">
          <PdfExportButton targetRef={printRef} fileName="douglas-novato-curriculo-executivo" />
        </div>
      </div>

      {/* VISÃO INFOGRÁFICA INTERATIVA (TELA) */}
      <main className="space-y-10 no-print">

        {/* HERO SECTION */}
        <section className="bg-zinc-900/80 rounded-3xl p-6 sm:p-10 border border-zinc-800/80 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8">
            <div className="space-y-4 max-w-4xl">
              <div className="inline-flex flex-wrap items-center gap-2 text-xs font-bold text-sky-300">
                <span className="px-3 py-1 bg-sky-950/80 border border-sky-800/60 rounded-full flex items-center gap-1.5">
                  <MapPin size={12} className="text-sky-400" /> Juiz de Fora - MG
                </span>
                <span>•</span>
                <span className="px-3 py-1 bg-indigo-950/80 border border-indigo-800/60 rounded-full">
                  🚀 Criador do Ecossistema LearnTECH
                </span>
                <span>•</span>
                <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-800/60 rounded-full">
                  +17 Anos em Tecnologia
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                DOUGLAS ANTONIO BRAGA NOVATO
              </h2>

              <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-cyan-400">
                Desenvolvedor Fullstack de Produtos Digitais, Head de Educação & Salesforce CRM
              </p>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Especialista em CRM no Tech Growth e desenvolvimento de produtos digitais. Impulsiono o crescimento de Unidades de Negócio através da orquestração de jornadas de comunicação via Salesforce Marketing Cloud, alinhando visão estratégica de marketing à execução técnica de desenvolvimento (Landing Pages, e-commerce e evolução de produtos MERN/TS). Dedico-me também à Coordenação e Instrução na escola de programação ByteClass e organização de eventos da comunidade tech.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'React.js & Next.js', 'Vue.js 3', 'Node.js & Express', 'TypeScript', 'Laravel / PHP',
                  'Salesforce SFMC', 'AMPscript & SSJS', 'Supabase & PostgreSQL', 'MongoDB', 'AWS / Vercel / Render'
                ].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-zinc-800/90 text-zinc-300 rounded-md text-xs font-mono border border-zinc-700/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full xl:w-80 bg-zinc-950/90 text-white p-6 rounded-2xl border border-zinc-800/80 shadow-xl space-y-4 text-xs">
              <div className="font-bold text-sky-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Terminal size={14} /> Conexões & Hubs Diretos
              </div>
              <div className="space-y-2">
                <a href="https://linkedin.com/in/douglasabnovato" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-zinc-900 hover:bg-sky-950/50 text-sky-300 transition flex items-center justify-between font-semibold border border-zinc-800">
                  <span className="truncate">LinkedIn: /in/douglasabnovato</span>
                  <ExternalLink size={12} />
                </a>
                <a href="https://linktr.ee/douglasabnovato" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-zinc-900 hover:bg-sky-950/50 text-emerald-400 transition flex items-center justify-between font-semibold border border-zinc-800">
                  <span className="truncate">Linktree: /douglasabnovato</span>
                  <ExternalLink size={12} />
                </a>
                <a href="https://github.com/douglasabnovato" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-zinc-900 hover:bg-sky-950/50 text-sky-300 transition flex items-center justify-between font-semibold border border-zinc-800">
                  <span className="truncate">GitHub: @douglasabnovato</span>
                  <ExternalLink size={12} />
                </a>
                <a href="https://medium.com/@douglasabnovato" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-zinc-900 hover:bg-sky-950/50 text-sky-300 transition flex items-center justify-between font-semibold border border-zinc-800">
                  <span className="truncate">Medium: Artigos & Arquitetura</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="pt-3 border-t border-zinc-800/80 space-y-1.5 text-zinc-300">
                <div className="flex items-center space-x-2.5">
                  <Phone size={14} className="text-sky-400" />
                  <span>(32) 98836-7667</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail size={14} className="text-sky-400" />
                  <span className="truncate">douglasabnovato@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. INDICADORES & PILARES ESTRATÉGICOS */}
        <section className="space-y-4">
          <div className="border-l-4 border-sky-500 pl-4">
            <h3 className="text-xl font-black text-white">Indicadores & Pilares Estratégicos</h3>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Síntese quantitativa da carreira e competências de alto impacto</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-2">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Histórico Contínuo</div>
              <div className="text-3xl font-black text-sky-400">+17 Anos</div>
              <p className="text-xs text-zinc-400 leading-relaxed">Atuação ininterrupta desde 2009 (SENAI, Receita Federal, UFJF, Nvoip, Jamboo, Grupo MYSA e ByteClass).</p>
            </div>

            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-2">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Liderança EdTech</div>
              <div className="text-3xl font-black text-indigo-400">ByteClass</div>
              <p className="text-xs text-zinc-400 leading-relaxed">Coordenador de Educação e Tecnologia, liderando matrizes curriculares Fullstack e o ecossistema learnTECH.</p>
            </div>

            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-2">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">CRM & Growth Specialist</div>
              <div className="text-3xl font-black text-cyan-400">Salesforce</div>
              <p className="text-xs text-zinc-400 leading-relaxed">Tech Growth em CRM no Grupo MYSA (ABC da Construção / Casa Dexco) com SFMC, AMPscript, SSJS, SOQL e APIs.</p>
            </div>

            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-2">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Produtos & Arq. Web</div>
              <div className="text-3xl font-black text-emerald-400">Fullstack</div>
              <p className="text-xs text-zinc-400 leading-relaxed">Engenharia MERN + Vue/Laravel + Supabase para logística (Volta Express), PMEs e ecossistemas educacionais.</p>
            </div>
          </div>
        </section>

        {/* 2. DASHBOARD DE MÉTRICAS E GRÁFICOS */}
        <section className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-black text-white">Análise Visual de Competências & Atuação</h3>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Mapeamento multidimensional de proficiência técnica e escopo profissional</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-1">Matriz de Domínio Técnico</h4>
                <p className="text-xs text-zinc-400 mb-4">Mapeamento de proficiência técnica por frentes de engenharia e arquitetura.</p>
              </div>
              <div className="h-[280px] w-full relative">
                <Radar data={radarData} options={radarOptions} />
              </div>
              <p className="mt-4 p-3 bg-zinc-950/60 rounded-xl text-xs text-zinc-300 border border-zinc-800">
                <strong className="text-sky-400">Síntese Técnica:</strong> Domínio do ecossistema reativo moderno (React, Vue 3, TypeScript), backend estruturado (Node.js, Express, Laravel), governança de dados e automações corporativas em Salesforce SFMC.
              </p>
            </div>

            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white mb-1">Distribuição do Escopo Profissional</h4>
                <p className="text-xs text-zinc-400 mb-4">Proporção estratégica das frentes de atuação consolidada.</p>
              </div>
              <div className="h-[280px] w-full relative">
                <Doughnut data={donutData} options={donutOptions} />
              </div>
              <p className="mt-4 p-3 bg-zinc-950/60 rounded-xl text-xs text-zinc-300 border border-zinc-800">
                <strong className="text-indigo-400">Versatilidade Estratégica:</strong> Equilíbrio sólido entre engenharia de produtos digitais fullstack (35%), coordenação e instrução (30%), CRM corporativo em Salesforce (20%) e gestão/processos (15%).
              </p>
            </div>
          </div>
        </section>

        {/* 3. ATUAÇÃO ATUAL & PROJETOS DE ALTO IMPACTO */}
        <section className="space-y-4">
          <div className="border-l-4 border-sky-500 pl-4">
            <h3 className="text-xl font-black text-white">Atuação Atual & Projetos de Alto Impacto</h3>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Liderança pedagógica, desenvolvimento de produtos digitais e o ecossistema learnTECH</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-zinc-900/60 p-7 rounded-2xl border border-zinc-800/80 space-y-4 relative overflow-hidden">
              <div className="w-2 h-full bg-sky-500 absolute left-0 top-0"></div>
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-950 text-sky-300 border border-sky-800">Ago/2025 – Presente</span>
                <span className="text-xs font-bold text-zinc-400">Tempo Integral • Presencial</span>
              </div>
              <div>
                <h4 className="text-xl font-black text-white">Coordenador de Educação e Tecnologia</h4>
                <p className="text-xs font-bold text-sky-400">ByteClass - Escola de Tecnologia, Programação e Desenvolvimento</p>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed border-t border-zinc-800 pt-3">
                Liderança da estrutura pedagógica, técnica e operacional da ByteClass em Juiz de Fora - MG. Atuação na definição metodológica, criação de formações em tecnologia e garantia de conexão com demandas do mercado.
              </p>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                  <strong className="text-white font-bold block">1. Coordenação Pedagógica & Gestão Docente:</strong>
                  <span>Elaboração de ementas técnicas, matrizes curriculares Fullstack e orientação contínua da equipe docente.</span>
                </div>
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                  <strong className="text-white font-bold block">2. Instrução & Mentoria Técnica:</strong>
                  <span>Aulas mão na massa, pair programming, code review, princípios de Clean Code e acompanhamento em projetos práticos.</span>
                </div>
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                  <strong className="text-white font-bold block">3. Inteligência de Conteúdo, Plataforma & Eventos Tech:</strong>
                  <span>LPs de conversão, indicadores de retenção/sucesso do aluno (CS) e articulação de eventos (DevOpsDays Juiz de Fora 2026).</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-7 rounded-2xl border border-zinc-800/80 space-y-4 relative overflow-hidden">
              <div className="w-2 h-full bg-indigo-500 absolute left-0 top-0"></div>
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-950 text-indigo-300 border border-indigo-800">Mar/2021 – Presente</span>
                <span className="text-xs font-bold text-zinc-400">Freelance / Remoto (5+ Anos)</span>
              </div>
              <div>
                <h4 className="text-xl font-black text-white">Desenvolvedor de Produtos Digitais & Consultor Fullstack</h4>
                <p className="text-xs font-bold text-indigo-400">Projetos Independentes & Volta Express Brasil</p>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed border-t border-zinc-800 pt-3">
                Engenharia e desenvolvimento de soluções digitais sob medida para microempreendedores, PMEs e startups nos setores de logística (Volta Express Brasil) e educação.
              </p>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                  <strong className="text-white font-bold block">1. Desenvolvimento Fullstack (Stack MERN & TypeScript):</strong>
                  <span>Construção de aplicações reativas com React.js no frontend e Node.js/Express no backend com Clean Code.</span>
                </div>
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                  <strong className="text-white font-bold block">2. Modelagem de Dados & Integração de APIs:</strong>
                  <span>Schemas PostgreSQL, MySQL e MongoDB; consumo e construção de APIs RESTful integradas a pagamentos e CRMs.</span>
                </div>
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                  <strong className="text-white font-bold block">3. Consultoria de Produto, Cloud & CI/CD:</strong>
                  <span>Prototipagem de MVPs com foco no princípio de Pareto (80/20) e deploys em Vercel, Render, Supabase e AWS.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRAJETÓRIA PROFISSIONAL CONSOLIDADA (+17 ANOS) */}
        <section className="space-y-4">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="text-xl font-black text-white">Trajetória Profissional Consolidada (+17 Anos)</h3>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Histórico detalhado de cargos corporativos, engenharia e posições técnicas desde 2009</p>
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <h4 className="text-lg font-black text-white">Tech Growth em CRM | Salesforce Developer</h4>
                  <p className="text-xs font-bold text-cyan-400">Grupo MYSA S.A. (ABC da Construção & Casa Dexco)</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 w-fit">Fev/2025 – Fev/2026</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-300">
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1.5">
                  <strong className="text-white font-bold block">Automação Salesforce SFMC & Apex/SOQL:</strong>
                  <p>Estruturação de jornadas no Marketing Cloud (Automation Studio, Journey Builder), CloudPages, SQL, SOQL, AMPscript, SSJS e conectores via REST API para múltiplas BUs.</p>
                </div>
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1.5">
                  <strong className="text-white font-bold block">Gestão de Parceiros & Front-end E-commerce:</strong>
                  <p>Interface técnica com fornecedores, governança de Data Extensions, otimização de e-commerce/LPs (HTML, CSS, JS/Node) e dashboards no Looker Studio.</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <h4 className="text-lg font-black text-white">Growth Hacker</h4>
                  <p className="text-xs font-bold text-zinc-400">ABC da Construção S.A.</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 w-fit">Jul/2023 – Jun/2025</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Evolução das estratégias de CRM via Constant Contact e Zenvia (WhatsApp/Email), extração e higienização de bases de dados, e ajustes de front-end na plataforma de e-commerce Wake (HTML, CSS, JavaScript).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-2">
                <div className="flex justify-between items-center text-zinc-400 text-[11px]">
                  <span className="font-bold text-sky-400">Nov/2022 – Fev/2023</span>
                  <span>Jamboo</span>
                </div>
                <h5 className="font-bold text-white text-sm">Desenvolvedor Frontend</h5>
                <p className="text-zinc-300 leading-relaxed">Interfaces de fidelidade em React.js, TypeScript, Tailwind CSS e styled-components com integração de dados JSON via APIs RESTful.</p>
              </div>

              <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-2">
                <div className="flex justify-between items-center text-zinc-400 text-[11px]">
                  <span className="font-bold text-sky-400">Dez/2020 – Ago/2021</span>
                  <span>Nvoip</span>
                </div>
                <h5 className="font-bold text-white text-sm">Analista de Desenvolvimento de Sistemas</h5>
                <p className="text-zinc-300 leading-relaxed">Plataforma VoIP em ReactJS, Redux e Hooks integrados a backend Java e MariaDB, adquirindo domínio em telefonia IP/SIP.</p>
              </div>

              <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-2">
                <div className="flex justify-between items-center text-zinc-400 text-[11px]">
                  <span className="font-bold text-sky-400">Jul/2019 – Out/2019</span>
                  <span>AlmavivA do Brasil</span>
                </div>
                <h5 className="font-bold text-white text-sm">Supervisor de Operações</h5>
                <p className="text-zinc-300 leading-relaxed">Gestão da equipe de atendimento TIM Controle, aplicação de métricas operacionais, análise de riscos e avaliação de desempenho.</p>
              </div>

              <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-2">
                <div className="flex justify-between items-center text-zinc-400 text-[11px]">
                  <span className="font-bold text-sky-400">Set/2015 – Set/2019</span>
                  <span>Brasil Center Comunicações</span>
                </div>
                <h5 className="font-bold text-white text-sm">Suporte Técnico / Líder de Equipe</h5>
                <p className="text-zinc-300 leading-relaxed">Atendimento especializado NET Claro; liderança de equipe com ferramentas gerenciais (5W2H, PDCA, Ishikawa, FMEA, Pareto).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-sky-400">Jan/2014 – Jun/2015</span>
                  <span className="text-zinc-400">Oficina da Net</span>
                </div>
                <h6 className="font-bold text-white">Colunista de Tecnologia</h6>
                <p className="text-zinc-400 text-[11px]">Redação técnica sobre algoritmos de busca (SEO), governança de dados (SPSS) e desenvolvimento web.</p>
              </div>

              <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-sky-400">Fev/2013 – Dez/2013</span>
                  <span className="text-zinc-400">UFJF (Projeto iNtegra)</span>
                </div>
                <h6 className="font-bold text-white">Bolsista em Dev Web</h6>
                <p className="text-zinc-400 text-[11px]">Sustentação do portal acadêmico central (Eleições, Eventos, Reserva de Salas, Impressão e E-mail).</p>
              </div>

              <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-sky-400">Mai/2011 – Jun/2013</span>
                  <span className="text-zinc-400">Receita Federal DRJ</span>
                </div>
                <h6 className="font-bold text-white">Estagiário de TI e Planejamento</h6>
                <p className="text-zinc-400 text-[11px]">Projeto "Zero Processo Físico", desenvolvimento desktop em Delphi+Access para parsing de relatórios PDF.</p>
              </div>
            </div>

            <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 flex flex-wrap justify-between items-center text-xs text-zinc-400 gap-2">
              <span className="font-bold text-white">Primeiros Passos da Carreira (2009 – 2011):</span>
              <span>• Bolsista de Estrutura de Dados em C na UFJF (2010 – 2011)</span>
              <span>• Aprendiz Industrial em TI SENAI MG / BrasilCenter (2009 – 2009)</span>
            </div>
          </div>
        </section>

        {/* 5. ECOSSISTEMA TECNOLÓGICO & MATRIZ DE COMPETÊNCIAS */}
        <section className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Layers size={20} className="text-emerald-400" />
              <span>Ecossistema Tecnológico & Matriz de Competências</span>
            </h3>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Mapeamento completo de hard & soft skills catalogadas</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
                <Code2 size={16} />
                <span>Frontend & Reatividade</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                <li className="flex justify-between"><span>React.js / Next.js</span><span className="text-sky-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>Vue.js 3</span><span className="text-sky-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>TypeScript</span><span className="text-sky-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>Tailwind / SASS</span><span className="text-sky-400 font-bold">Fluente</span></li>
                <li className="flex justify-between"><span>HTML5 / ES6+</span><span className="text-sky-400 font-bold">Especialista</span></li>
                <li className="flex justify-between"><span>UX & Clean Code</span><span className="text-sky-400 font-bold">Avançado</span></li>
              </ul>
            </div>

            <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                <Cpu size={16} />
                <span>Backend & APIs</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                <li className="flex justify-between"><span>Node.js / Express</span><span className="text-indigo-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>APIs REST / GraphQL</span><span className="text-indigo-400 font-bold">Especialista</span></li>
                <li className="flex justify-between"><span>Laravel (PHP)</span><span className="text-indigo-400 font-bold">Intermediário</span></li>
                <li className="flex justify-between"><span>Java & C/C++</span><span className="text-indigo-400 font-bold">Base Sólida</span></li>
                <li className="flex justify-between"><span>SDLC & POO</span><span className="text-indigo-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>Delphi / Legacy</span><span className="text-indigo-400 font-bold">Prático</span></li>
              </ul>
            </div>

            <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                <Database size={16} />
                <span>Dados & Cloud</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                <li className="flex justify-between"><span>PostgreSQL / MySQL</span><span className="text-cyan-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>Supabase BaaS</span><span className="text-cyan-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>MongoDB (NoSQL)</span><span className="text-cyan-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>Git / GitHub</span><span className="text-cyan-400 font-bold">Fluente</span></li>
                <li className="flex justify-between"><span>Vercel / Render</span><span className="text-cyan-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>Jenkins / CI/CD</span><span className="text-cyan-400 font-bold">Prático</span></li>
              </ul>
            </div>

            <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <Cloud size={16} />
                <span>Salesforce & CRM</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                <li className="flex justify-between"><span>Salesforce SFMC</span><span className="text-emerald-400 font-bold">Especialista</span></li>
                <li className="flex justify-between"><span>AMPscript & SSJS</span><span className="text-emerald-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>SOQL / SQL Data</span><span className="text-emerald-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>Journey Builder</span><span className="text-emerald-400 font-bold">Especialista</span></li>
                <li className="flex justify-between"><span>Zenvia / WhatsApp</span><span className="text-emerald-400 font-bold">Avançado</span></li>
                <li className="flex justify-between"><span>Constant Contact</span><span className="text-emerald-400 font-bold">Avançado</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. PROJETOS DIGITAIS, PUBLICAÇÕES & CÓDIGO ABERTO */}
        <section className="space-y-4">
          <div className="border-l-4 border-zinc-500 pl-4">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <BookOpen size={20} className="text-zinc-400" />
              <span>Projetos Digitais, Publicações & Código Aberto</span>
            </h3>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Produção técnica continuada no GitHub e Medium desde 2015</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">✍️</span>
                  <div>
                    <h4 className="font-bold text-white">Publicações Principais & Medium</h4>
                    <span className="text-[10px] text-sky-400 font-semibold">@douglasabnovato • Out/2019 – Presente</span>
                  </div>
                </div>
                <a href="https://medium.com/@douglasabnovato" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-sky-400 hover:underline">Acessar Medium ↗</a>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Artigos técnicos focados em carreira, engenharia de software e frameworks modernos, visando o desenvolvimento de análises originais:
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-zinc-950/60 rounded-xl font-medium text-zinc-200 border border-zinc-800 flex items-center justify-between">
                  <span>• SEGREDOS para conquistar a vaga de dev sem experiência</span>
                  <span className="text-[10px] text-sky-400 font-bold">Publicação</span>
                </div>
                <div className="p-3 bg-zinc-950/60 rounded-xl font-medium text-zinc-200 border border-zinc-800 flex items-center justify-between">
                  <span>• Angelina: o sistema que cria jogos sozinho</span>
                  <span className="text-[10px] text-sky-400 font-bold">Publicação</span>
                </div>
                <div className="p-3 bg-zinc-950/60 rounded-xl font-medium text-zinc-200 border border-zinc-800 flex items-center justify-between">
                  <span>• Um guia completo de React Native</span>
                  <span className="text-[10px] text-sky-400 font-bold">Publicação</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">💻</span>
                  <div>
                    <h4 className="font-bold text-white">Perfil no GitHub (@douglasabnovato)</h4>
                    <span className="text-[10px] text-sky-400 font-semibold">Jan/2015 – Presente</span>
                  </div>
                </div>
                <a href="https://github.com/douglasabnovato" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-sky-400 hover:underline">Ver GitHub ↗</a>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Repositório continuado para exibição de tutoriais e projetos originais desenvolvidos para praticar e consolidar conteúdos técnicos em JS, React, Node, SQL, TS, Next.js e Supabase.
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-zinc-950/60 rounded-xl font-medium text-zinc-200 border border-zinc-800 flex items-center justify-between">
                  <span>• Ecossistema learnTECH / ByteClass Repos</span>
                  <span className="text-[10px] text-sky-400 font-bold">Public</span>
                </div>
                <div className="p-3 bg-zinc-950/60 rounded-xl font-medium text-zinc-200 border border-zinc-800 flex items-center justify-between">
                  <span>• MERN Stack & Fullstack Starter Kits</span>
                  <span className="text-[10px] text-sky-400 font-bold">Public</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FORMAÇÃO ACADÊMICA, VOLUNTARIADO & IDIOMAS REVISADOS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-5">
            <div className="border-l-4 border-sky-500 pl-3">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <GraduationCap size={20} className="text-sky-400" />
                <span>Formação Acadêmica & Certificações</span>
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-sm">Tecnologia em Análise e Desenvolvimento de Sistemas (BTech)</h4>
                  <span className="px-2.5 py-0.5 bg-sky-950 text-sky-300 border border-sky-800 rounded font-mono font-bold">Fev/2023 – Jul/2025</span>
                </div>
                <div className="text-sky-400 font-semibold">Faculdade Estácio de Sá</div>
                <p className="text-zinc-400 text-[11px] pt-1">Projetar, documentar, especificar, testar, implementar e cuidar da manutenção de sistemas computacionais.</p>
              </div>

              <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-sm">Técnico de Informática (Desenvolvimento Web)</h4>
                  <span className="px-2.5 py-0.5 bg-zinc-800 text-zinc-300 rounded font-mono font-bold">2016 – 2017</span>
                </div>
                <div className="text-sky-400 font-semibold">IF Sudeste MG - Campus Juiz de Fora</div>
                <p className="text-zinc-400 text-[11px] pt-1">Desenvolvimento web, segurança da informação, algoritmos e web design responsivo.</p>
              </div>

              <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-sm">Bacharelado em Ciência da Computação</h4>
                  <span className="px-2.5 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded font-mono font-bold">2008 – 2015 (Cursados 4/8 períodos)</span>
                </div>
                <div className="text-sky-400 font-semibold">UFJF - Universidade Federal de Juiz de Fora</div>
                <p className="text-zinc-400 text-[11px] pt-1">Bolsista de Pesquisa e Atleta da Atlética do ICE. Destaque em Algoritmos e Bancos de Dados.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award size={14} className="text-indigo-400" /> Licenças & Certificados Emitidos
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-sky-950/40 rounded-xl border border-sky-900/60 space-y-1">
                  <div className="font-bold text-sky-200">Udemy (Mar/2023)</div>
                  <div className="text-[11px] text-sky-400">API Rest com Laravel 9 (Eloquent ORM)</div>
                </div>
                <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/60 space-y-1">
                  <div className="font-bold text-indigo-200">Cod3r (Jun/2021)</div>
                  <div className="text-[11px] text-indigo-400">React + Redux (TS, Next, Node, Mongo)</div>
                </div>
                <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-900/60 space-y-1">
                  <div className="font-bold text-cyan-200">Sólides (Ago/2019)</div>
                  <div className="text-[11px] text-cyan-400">Oratória, Comunicação & Pitch Criativo</div>
                </div>
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-900/60 space-y-1">
                  <div className="font-bold text-emerald-200">Fundação Estudar (Ago/2018)</div>
                  <div className="text-[11px] text-emerald-400">Produtividade & Gestão de Carreira</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-zinc-800 pb-2 flex items-center gap-2">
                <HeartHandshake size={18} className="text-indigo-400" /> Voluntariado & Idiomas
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-white">Code Empresa Júnior (UFJF)</div>
                    <span className="text-[10px] text-zinc-400 font-mono">Jul/14 – Fev/16</span>
                  </div>
                  <div className="text-indigo-400 font-bold">Diretor de Qualidade & Analista</div>
                  <p className="text-zinc-400 text-[11px]">Mapeamento de processos, certificação ISO e apresentação dos Pitches de Federação na FEJEMG (PUF).</p>
                </div>

                <div className="p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-white">AIESEC Juiz de Fora</div>
                    <span className="text-[10px] text-zinc-400 font-mono">Mai/10 – Set/11</span>
                  </div>
                  <div className="text-indigo-400 font-bold">Finanças, Marketing & Vendas B2B</div>
                  <p className="text-zinc-400 text-[11px]">Prospecção no 3º setor, fechamento de contratos e captação de estudantes em ambiente multicultural.</p>
                </div>

                <div className="p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-white">DevOpsDays Juiz de Fora (2026)</div>
                    <span className="text-[10px] text-zinc-400 font-mono">2026</span>
                  </div>
                  <div className="text-indigo-400 font-bold">Coorganizador</div>
                  <p className="text-zinc-400 text-[11px]">Articulação comunitária, grade técnica e parceria institucional.</p>
                </div>

                <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Globe size={14} className="text-sky-400" /> Proficiência em Idiomas
                  </div>
                  <div className="space-y-1 text-zinc-300 text-[11px]">
                    <div className="flex justify-between">
                      <span><strong>Inglês:</strong> Professional Working</span>
                      <span className="text-sky-400 font-mono">Fluente Técnico</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>Espanhol:</strong> Elementary</span>
                      <span className="text-zinc-400 font-mono">Básico</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* COMPONENTE ISOLADO DE IMPRESSÃO (PDF EXPORT) */}
      <CurriculumPrintTemplate ref={printRef} />

    </div>
  );
};