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
  { id: "rocket-coffee", title: "Rocket Coffee", description: "Landing page para um café virtual.", category: "destaque", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/rocket-coffee" }] },
  { id: "espetinho-de-minas", title: "Espetinho de Minas", description: "Landing page para um Food Truck.", category: "destaque", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/espetinho-de-minas" }] },
];

// Distribuição aleatória/placeholder — você organiza os repositórios reais do GitHub depois
export const demaisProjetos: CuratedProject[] = [
  { id: "pastel-e-cana", title: "Pastel e Cana", description: "Descrição a atualizar.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/pastel-e-cana" }] },
  { id: "onibus-horarios", title: "Ônibus Horários", description: "Descrição a atualizar.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/onibus-horarios" }] },
  { id: "dc-jardinagem", title: "DC Jardinagem", description: "Descrição a atualizar.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/dc-jardinagem" }] },
  { id: "personal-trainer", title: "Personal Trainer", description: "Descrição a atualizar.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/personal-trainer" }] },
  { id: "meu-predio", title: "Meu Prédio", description: "Descrição a atualizar.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/meu-predio" }] },
  { id: "apresentacao", title: "Apresentação", description: "Projeto para apresentar, descrever e expor um produto com conteúdos importantes.", category: "projetos-originais", links: [{ label: "Repositório (branch v-dev-coffee)", url: "https://github.com/douglasabnovato/apresentacao/tree/v-dev-coffee" }] },
  { id: "finances", title: "Finances", description: "Aplicação web responsiva para gestão de finanças pessoais, com registros de entradas, saídas e saldo.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/finances" }] },
  { id: "saude", title: "Saúde", description: "Site institucional para a área da saúde.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/saude" }] },
  { id: "my-linktree", title: "My Linktree", description: "Página com lista de links, usada em perfis de redes sociais para direcionar o usuário ao destino escolhido.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/my-linktree" }] },
  { id: "hamburgueria", title: "Hamburgueria", description: "Descrição a atualizar.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/hamburgueria" }] },
  { id: "catalogo-cafeteria", title: "Catálogo Cafeteria", description: "Descrição a atualizar.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/catalogo-cafeteria" }] },
  { id: "feedback-widget", title: "Feedback Widget", description: "Widget que pode ser usado em aplicações web e mobile para receber feedback de usuários.", category: "projetos-originais", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/feedback-widget" }] },

  { id: "ph-formacao-proj-1", title: "Formação Projeto A", description: "Placeholder", category: "formacao-projetos", links: [], placeholder: true },
  { id: "ph-formacao-proj-2", title: "Formação Projeto B", description: "Placeholder", category: "formacao-projetos", links: [], placeholder: true },
  { id: "ph-formacao-cont-1", title: "Formação Conteúdo A", description: "Placeholder", category: "formacao-conteudos", links: [], placeholder: true },
  { id: "ph-formacao-cont-2", title: "Formação Conteúdo B", description: "Placeholder", category: "formacao-conteudos", links: [], placeholder: true },
  { id: "ph-templates-1", title: "Template Institucional A", description: "Placeholder", category: "templates-institucionais", links: [], placeholder: true },
  { id: "ph-templates-2", title: "Template Institucional B", description: "Placeholder", category: "templates-institucionais", links: [], placeholder: true },
];