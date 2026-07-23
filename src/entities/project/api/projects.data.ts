import type { CuratedProject } from "../model/types";

export const especiais: CuratedProject[] = [
  { id: "learn-tech", title: "LearnTECH", tag: "Ecossistema · LXP", description: "Plataforma principal do ecossistema — LXP e hub de engenharia da ByteClass.", category: "especial", links: [{ label: "Acessar", url: "https://learn-tech-pied.vercel.app" }], accentColor: "#6d63d8" },
  { id: "bootcamps", title: "Bootcamps", tag: "Retrospectiva de eventos", description: "Retrospectiva e roteiro de bootcamps, formações e comunidades.", category: "especial", links: [{ label: "Acessar", url: "https://bootcamps-dun.vercel.app" }], accentColor: "#00c853" },
  { id: "tools", title: "Tools", tag: "Catálogo de ferramentas", description: "Catálogo curado de ferramentas e hospedagens para devs.", category: "especial", links: [{ label: "Acessar", url: "https://douglasabnovato.github.io/tools" }], accentColor: "#0ad2ff" },
  { id: "career", title: "Career", tag: "Vagas e empresas", description: "Oportunidades, empresas e perfis de devs.", category: "especial", links: [{ label: "Acessar", url: "https://douglasabnovato.github.io/career" }], accentColor: "#f97316" },
]; 

export const destaques: CuratedProject[] = [
  { id: "doctor-care", title: "DoctorCare", description: "Landing page institucional para profissionais autônomos da saúde.", category: "destaque", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/doctor-care" }] },
  { id: "cracha-virtual", title: "Crachá Virtual", description: "Gerador de crachá digital mobile-first com links sociais.", category: "destaque", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/cracha-virtual" }] },
  { id: "desafio-1", title: "Desafio 1", description: "", category: "destaque", links: [], placeholder: true },
  { id: "desafio-2", title: "Desafio 2", description: "", category: "destaque", links: [], placeholder: true },
];

// Distribuição aleatória/placeholder — você organiza os repositórios reais do GitHub depois
export const demaisProjetos: CuratedProject[] = [
  { id: "ph-originais-1", title: "Projeto Original A", description: "Placeholder", category: "projetos-originais", links: [], placeholder: true },
  { id: "ph-originais-2", title: "Projeto Original B", description: "Placeholder", category: "projetos-originais", links: [], placeholder: true },
  { id: "ph-formacao-proj-1", title: "Formação Projeto A", description: "Placeholder", category: "formacao-projetos", links: [], placeholder: true },
  { id: "ph-formacao-proj-2", title: "Formação Projeto B", description: "Placeholder", category: "formacao-projetos", links: [], placeholder: true },
  { id: "ph-formacao-cont-1", title: "Formação Conteúdo A", description: "Placeholder", category: "formacao-conteudos", links: [], placeholder: true },
  { id: "ph-formacao-cont-2", title: "Formação Conteúdo B", description: "Placeholder", category: "formacao-conteudos", links: [], placeholder: true },
  { id: "ph-templates-1", title: "Template Institucional A", description: "Placeholder", category: "templates-institucionais", links: [], placeholder: true },
  { id: "ph-templates-2", title: "Template Institucional B", description: "Placeholder", category: "templates-institucionais", links: [], placeholder: true },
];