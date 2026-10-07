// src/entities/project/api/projects.data.ts
import type { CuratedProject, ManagementBoard } from "../model/types";
import boardEcossistemaImg from "@/assets/engenheiro-de-software.jpg";
import boardMoviesImg from "@/assets/movies-app.jpg";

// PROFILE (1)
export const profileRepo: CuratedProject[] = [
  {
    id: "douglasabnovato",
    title: "douglasabnovato",
    tag: "Profile · GitHub",
    description:
      "Perfil principal com hard skills, soft skills e apresentação profissional.",
    category: "profile",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/douglasabnovato",
      },
    ],
  },
];

// Gestão de Projetos (2)
export const managementBoards: ManagementBoard[] = [
  {
    id: "movies-board",
    nome: "Product Manager para Movies",
    publico: true,
    kicker: "Gestão de produto · aberto para conferência",
    resumo:
      "Plataforma de catálogo e recomendação de filmes conduzida como case de produto, da descoberta ao deploy. Benchmark de Netflix e Prime Video, backlog estruturado no GitHub Projects, e entrega em React com camada de serviço isolando o consumo da API, Context API para o estado dos filtros e debounce na busca global.",
    visoes: ["Kanban", "To Do List", "Gestão Entrega"],
    metricas: [
      { label: "itens no board", value: "24" },
      { label: "concluídos", value: "16" },
    ],
    url: "https://github.com/users/douglasabnovato/projects/1",
    repoUrl: "https://github.com/douglasabnovato/movies",
    issuesUrl: "https://github.com/douglasabnovato/movies/issues",
    imagem: boardMoviesImg,
  },
  {
    id: "learntech-ecossistema",
    nome: "LearnTECH Ecossistema",
    publico: false,
    kicker: "Gestão de portfólio · acesso restrito",
    resumo:
      "Board pessoal que orquestra as frentes de trabalho: o ecossistema learnTECH, a ByteClass, a MedTREM e a Volta Express Brasil.",
    metodo:
      "Ideias entram numa coluna própria e são triadas por papel — desenvolvimento, escrita, palestra, growth e bootcamp. Depois de priorizadas, vão para o To-Do da frente correspondente e seguem a esteira Em andamento → Revisão → Concluído. O que perde sentido vai para Arquivado. Sprints de 7 dias, com dois workflows automatizados.",
    visoes: ["Tasks", "Progress", "Management"],
    imagem: boardEcossistemaImg,
    ponte:
      "O mesmo método, aberto para conferência, no board público do Movies.",
  },
];

// ESPECIAIS (5)
export const especiais: CuratedProject[] = [
  {
    id: "douglasabnovato-dev",
    title: "douglasabnovato.dev",
    tag: "Portfólio Pessoal",
    description: "Aplicação web atual do portfólio e ecossistema profissional.",
    category: "especial",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/douglasabnovato.dev",
      },
    ],
    accentColor: "#a855f7",
  },
  {
    id: "bootcamps",
    title: "Bootcamps",
    tag: "Retrospectiva de eventos",
    description:
      "Retrospectiva e roteiro de bootcamps, formações e comunidades.",
    category: "especial",
    links: [
      {
        label: "Acessar",
        url: "https://bootcamps-dun.vercel.app",
        hospedado: true,
      },
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/bootcamps",
      },
    ],
    accentColor: "#00c853",
  },
  {
    id: "learn-tech",
    title: "LearnTECH",
    tag: "Ecossistema · LXP",
    description:
      "Plataforma principal do ecossistema — LXP e hub de engenharia da ByteClass.",
    category: "especial",
    links: [
      {
        label: "Acessar",
        url: "https://learn-tech-pied.vercel.app",
        hospedado: true,
      },
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/learn-tech",
      },
    ],
    accentColor: "#6d63d8",
  },
  {
    id: "career",
    title: "Career",
    tag: "Vagas e empresas",
    description: "Oportunidades, empresas e perfis de devs.",
    category: "especial",
    links: [
      {
        label: "Acessar",
        url: "https://douglasabnovato.github.io/career",
        hospedado: true,
      },
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/career",
      },
    ],
    accentColor: "#f97316",
  },
  {
    id: "tools",
    title: "Tools",
    tag: "Catálogo de ferramentas",
    description: "Catálogo curado de ferramentas e hospedagens para devs.",
    category: "especial",
    links: [
      {
        label: "Acessar",
        url: "https://douglasabnovato.github.io/tools",
        hospedado: true,
      },
      { label: "Repositório", url: "https://github.com/douglasabnovato/tools" },
    ],
    accentColor: "#0ad2ff",
  },
];

// TOP (2)
export const destaques: CuratedProject[] = [
  {
    id: "ux-design",
    title: "UX Design",
    description:
      "Guia prático e catálogo de princípios e padrões de UX/UI Design.",
    status: "mvp",
    tipo: "educacional",
    category: "top",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/ux-design",
      },
    ],
  },
  {
    id: "aula-de-programacao",
    title: "Aula de Programação",
    description:
      "Material didático e roteiro de aulas interativas de programação.",
    status: "mvp",
    tipo: "educacional",
    category: "top",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/aula-de-programacao",
      },
    ],
  },
];

// MVP (10+2)
export const mvpRepos: CuratedProject[] = [
  {
    id: "facil-admin-para-voce",
    title: "Fácil Admin Para Você",
    description:
      "Conheça essa plataforma para solucionar o seu problema no seu condomínio.",
    status: "mvp",
    tipo: "utilitario",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/facil-admin-para-voce",
      },
    ],
  },
  {
    id: "facil-admin-gestao",
    title: "Fácil Admin Gestão",
    description:
      "Um portal de administração inteligente de condomínios residenciais e empresariais.",
    status: "mvp",
    tipo: "utilitario",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/facil-admin-gestao",
      },
    ],
  },
  {
    id: "facil-admin-plataforma",
    title: "Fácil Admin Plataforma",
    description:
      "A plataforma facilities para condomínios e fornecedores de serviços de produtos e serviços.",
    status: "mvp",
    tipo: "utilitario",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/facil-admin-plataforma",
      },
    ],
  },
  {
    id: "restaurante-churrascaria",
    title: "Restaurante Churrascaria",
    description: "Cardápio digital interativo e reservas para restaurante.",
    status: "mvp",
    tipo: "lp-de-produto",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/restaurante-churrascaria",
      },
    ],
  },
  {
    id: "movies",
    title: "Movies",
    description:
      "Aplicação para visualizar e buscar filmes conforme regras de negócio.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/movies",
      },
    ],
  },
  {
    id: "feedback-widget",
    title: "Feedback Widget",
    description:
      "Widget que pode ser usado em aplicações web e mobile para feedback.",
    status: "mvp",
    tipo: "utilitario",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/feedback-widget",
      },
    ],
  },
  {
    id: "dashboards",
    title: "Dashboards",
    description: "Módulo de gráficos e dashboards analíticos de negócios.",
    status: "mvp",
    tipo: "utilitario",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/dashboards",
      },
    ],
  },
  {
    id: "controle-financas",
    title: "Controle Finanças",
    description: "Gerenciador financeiro pessoal com fluxo de caixa.",
    status: "mvp",
    tipo: "financeiro",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/controle-financas",
      },
    ],
  },
  {
    id: "coin-wallet",
    title: "Coin Wallet",
    description: "Carteira digital e controle financeiro.",
    status: "mvp",
    tipo: "financeiro",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/coin-wallet",
      },
    ],
  },
  {
    id: "cm-quiz-app",
    title: "CM Quiz App",
    description: "Quiz multiplayer personalizado para eventos e feiras.",
    status: "em-desenvolvimento",
    tipo: "educacional",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/cm-quiz-app",
      },
    ],
  },
  {
    id: "catalogo-acai",
    title: "Catálogo Açaí",
    description: "Cardápio e pedidos online otimizados para mobile.",
    status: "mvp",
    tipo: "lp-de-produto",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/catalogo-acai",
      },
    ],
  },
  {
    id: "e-commerce-t-shirt",
    title: "T-Shirt Store",
    description: "E-commerce de moda com o seu estilo.",
    status: "mvp",
    tipo: "projeto",
    category: "mvp",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/e-commerce-t-shirt",
      },
      {
        label: "Acessar",
        url: "https://douglasabnovato.alwaysdata.net",
        hospedado: true,
      },
    ],
  },
];

// PROJETOS (27)
export const projetosOriginais: CuratedProject[] = [
  {
    id: "douglasabnovato",
    title: "douglasabnovato",
    description: "Profile com as minhas hard skills.",
    status: "mvp",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/douglasabnovato",
      },
    ],
  },

  {
    id: "dev-radar",
    title: "Dev Radar",
    description:
      "App inspirado no Waze para localizar desenvolvedores na região.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/dev-radar",
      },
    ],
  },

  {
    id: "signature-generator",
    title: "Signature Generator",
    description: "Gerador de assinaturas profissionais para e-mails.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/signature-generator",
      },
    ],
  },

  {
    id: "valoriza",
    title: "Valoriza",
    description:
      "Backend de uma plataforma para promover reconhecimento entre colegas.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/valoriza",
      },
    ],
  },

  {
    id: "sushibar",
    title: "Sushibar",
    description: "Cardápio digital consultando uma API.",
    status: "em-desenvolvimento",
    tipo: "lp-de-produto",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/sushibar",
      },
    ],
  },

  {
    id: "rocket-q",
    title: "Rocket Q",
    description:
      "Salas de perguntas para internautas anônimos gerenciadas por senha.",
    status: "em-desenvolvimento",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/rocket-q",
      },
    ],
  },

  {
    id: "proffy",
    title: "Proffy",
    description:
      "Cadastro de aulas com horário e conteúdo para interação com alunos.",
    status: "em-desenvolvimento",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/proffy",
      },
    ],
  },

  {
    id: "petshop",
    title: "Petshop",
    description: "Aplicação de cadastro para um petshop, projeto de formação.",
    status: "mvp",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/petshop",
      },
    ],
  },

  {
    id: "oxe-online",
    title: "Oxe Online",
    description: "Plataforma para processos seletivos digitais.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/oxe-online",
      },
    ],
  },

  {
    id: "niky",
    title: "Niky",
    description: "Construção de tarefas atendendo requisitos listados.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/niky",
      },
    ],
  },

  {
    id: "my-money-app",
    title: "My Money App",
    description:
      "Ciclos de pagamento com CRUD, gerenciamento de estado e navegação.",
    status: "em-desenvolvimento",
    tipo: "financeiro",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/my-money-app",
      },
    ],
  },

  {
    id: "letmeask",
    title: "Letmeask",
    description:
      "Salas de Q&A organizadas e democráticas para criadores de conteúdo.",
    status: "em-desenvolvimento",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/letmeask",
      },
    ],
  },

  {
    id: "learning-portal-fiori-sap",
    title: "Learning Portal Fiori SAP",
    description: "",
    status: "em-desenvolvimento",
    tipo: "projeto",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/learning-portal-fiori-sap",
      },
    ],
  },

  {
    id: "jobs-calc",
    title: "Jobs Calc",
    description:
      "Estimativa de custo para projetos freelancer, com cadastro e exclusão.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/jobs-calc",
      },
    ],
  },

  {
    id: "instagram-feed",
    title: "Instagram Feed",
    description: "Clone do feed do Instagram, exercício de prática de layout.",
    status: "mvp",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/instagram-feed",
      },
    ],
  },

  {
    id: "huntweb-swapi",
    title: "Huntweb SWAPI",
    description:
      "Consome a API SWAPI (Star Wars) e exibe no frontend em ReactJS.",
    status: "em-desenvolvimento",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/huntweb-swapi",
      },
    ],
  },

  {
    id: "doe-sangue-salve-vidas",
    title: "Doe Sangue, Salve Vidas",
    description: "Cadastro de pessoas para doação de sangue.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/doe-sangue-salve-vidas",
      },
    ],
  },

  {
    id: "components",
    title: "Components",
    description:
      "Layout para demonstrar os fundamentos do React Router na prática.",
    status: "mvp",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/components",
      },
    ],
  },

  {
    id: "casa-criativa",
    title: "Casa Criativa",
    description: "Aplicação para cadastrar e gerenciar ideias criativas.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/casa-criativa",
      },
    ],
  },

  {
    id: "calculadora",
    title: "Calculadora",
    description: "Calculadora básica, exercício de lógica de programação.",
    status: "mvp",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/calculadora",
      },
    ],
  },

  {
    id: "biblioteca",
    title: "Biblioteca",
    description: "Catálogo e gerenciamento de títulos de livros.",
    status: "em-desenvolvimento",
    tipo: "projeto",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/biblioteca",
      },
    ],
  },

  {
    id: "be-the-hero",
    title: "Be the Hero",
    description: "Cadastro de ONGs e causas para captação de apoiadores.",
    status: "em-desenvolvimento",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/be-the-hero",
      },
    ],
  },

  {
    id: "aircnc",
    title: "Aircnc",
    description: "Conecta empresas que querem abrir spots com desenvolvedores.",
    status: "em-desenvolvimento",
    tipo: "utilitario",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/aircnc",
      },
    ],
  },

  {
    id: "headset",
    title: "Headset",
    description: "Projeto para expor informações de um produto.",
    status: "em-desenvolvimento",
    tipo: "lp-de-produto",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/headset",
      },
    ],
  },

  {
    id: "learntech-content",
    title: "LearnTECH Content",
    description: "Conteúdos para servir o LearnTECH",
    status: "em-desenvolvimento",
    tipo: "educacional",
    category: "projetos",
    links: [
      {
        label: "Repositório",
        url: "https://github.com/douglasabnovato/learntech-content",
      },
    ],
  },
];
