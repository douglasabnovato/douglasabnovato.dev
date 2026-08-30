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
    description: "Perfil principal com hard skills, soft skills e apresentação profissional.",
    category: "profile",
    links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/douglasabnovato" }]
  },
];

// ESPECIAIS (5)
export const especiais: CuratedProject[] = [
  { id: "douglasabnovato-dev", title: "douglasabnovato.dev", tag: "Portfólio Pessoal", description: "Aplicação web atual do portfólio e ecossistema profissional.", category: "especial", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/douglasabnovato.dev" }], accentColor: "#a855f7" },
  { id: "bootcamps", title: "Bootcamps", tag: "Retrospectiva de eventos", description: "Retrospectiva e roteiro de bootcamps, formações e comunidades.", category: "especial", links: [{ label: "Acessar", url: "https://bootcamps-dun.vercel.app", hospedado: true }, { label: "Repositório", url: "https://github.com/douglasabnovato/bootcamps" }], accentColor: "#00c853" },
  { id: "learn-tech", title: "LearnTECH", tag: "Ecossistema · LXP", description: "Plataforma principal do ecossistema — LXP e hub de engenharia da ByteClass.", category: "especial", links: [{ label: "Acessar", url: "https://learn-tech-pied.vercel.app", hospedado: true }, { label: "Repositório", url: "https://github.com/douglasabnovato/learn-tech" }], accentColor: "#6d63d8" },
  { id: "career", title: "Career", tag: "Vagas e empresas", description: "Oportunidades, empresas e perfis de devs.", category: "especial", links: [{ label: "Acessar", url: "https://douglasabnovato.github.io/career", hospedado: true }, { label: "Repositório", url: "https://github.com/douglasabnovato/career" }], accentColor: "#f97316" },
  { id: "tools", title: "Tools", tag: "Catálogo de ferramentas", description: "Catálogo curado de ferramentas e hospedagens para devs.", category: "especial", links: [{ label: "Acessar", url: "https://douglasabnovato.github.io/tools", hospedado: true }, { label: "Repositório", url: "https://github.com/douglasabnovato/tools" }], accentColor: "#0ad2ff" },
];

// TOP (3)
export const destaques: CuratedProject[] = [
  { id: "ux-design", title: "UX Design", description: "Guia prático e catálogo de princípios e padrões de UX/UI Design.", status: "mvp", tipo: "educacional", category: "top", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/ux-design" }] },
  { id: "escola-de-programacao", title: "Escola de Programação", description: "Catálogo digital para criar conteúdos de programação — Hub de Projetos.", status: "mvp", tipo: "projeto", category: "top", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/escola-de-programacao" }] },
  { id: "aula-de-programacao", title: "Aula de Programação", description: "Material didático e roteiro de aulas interativas de programação.", status: "mvp", tipo: "educacional", category: "top", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/aula-de-programacao" }] },
];

// MVP (15)
export const mvpRepos: CuratedProject[] = [
  { id: "e-commerce-moda", title: "E-commerce Moda", description: "Plataforma de e-commerce voltada para o setor de moda.", status: "mvp", tipo: "lp-de-produto", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/e-commerce-moda" }] },
  { id: "t-shirt", title: "T-Shirt", description: "E-commerce de moda e vestuário.", status: "em-desenvolvimento", tipo: "lp-de-produto", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/t-shirt" }] },
  { id: "movies", title: "Movies", description: "Aplicação para visualizar e buscar filmes conforme regras de negócio.", status: "em-desenvolvimento", tipo: "utilitario", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/movies" }] },
  { id: "coin-wallet", title: "Coin Wallet", description: "Carteira digital e controle financeiro.", status: "mvp", tipo: "financeiro", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/coin-wallet" }] },
  { id: "facil-admin-para-voce", title: "Fácil Admin Para Você", description: "Plataforma administrativa orientada ao usuário final.", status: "mvp", tipo: "utilitario", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/facil-admin-para-voce" }] },
  { id: "facil-admin-gestao", title: "Fácil Admin Gestão", description: "Sistema de administração e gestão corporativa.", status: "mvp", tipo: "utilitario", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/facil-admin-gestao" }] },
  { id: "controle-financas", title: "Controle Finanças", description: "Gerenciador financeiro pessoal com fluxo de caixa.", status: "mvp", tipo: "financeiro", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/controle-financas" }] },
  { id: "marceneiro-rpc", title: "Marceneiro RPC", description: "Portfólio e catálogo digital para marcenaria.", status: "mvp", tipo: "site-institucional", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/marceneiro-rpc" }] },
  { id: "engenheiro-ghbn", title: "Engenheiro GHBN", description: "Plataforma e portfólio de engenharia.", status: "mvp", tipo: "site-institucional", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/engenheiro-ghbn" }] },
  { id: "personal-trainer", title: "Personal Trainer", description: "Landing page e gestão para profissional de educação física.", status: "mvp", tipo: "lp-de-produto", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/personal-trainer" }] },
  { id: "restaurante-churrascaria", title: "Restaurante Churrascaria", description: "Cardápio digital interativo e reservas para restaurante.", status: "mvp", tipo: "lp-de-produto", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/restaurante-churrascaria" }] },
  { id: "catalogo-acai", title: "Catálogo Açaí", description: "Cardápio e pedidos online otimizados para mobile.", status: "mvp", tipo: "lp-de-produto", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/catalogo-acai" }] },
  { id: "dashboards", title: "Dashboards", description: "Módulo de gráficos e dashboards analíticos de negócios.", status: "mvp", tipo: "utilitario", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/dashboards" }] },
  { id: "cm-quiz-app", title: "CM Quiz App", description: "Quiz multiplayer personalizado para eventos e feiras.", status: "em-desenvolvimento", tipo: "educacional", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/cm-quiz-app" }] },
  { id: "feedback-widget", title: "Feedback Widget", description: "Widget que pode ser usado em aplicações web e mobile para feedback.", status: "mvp", tipo: "utilitario", category: "mvp", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/feedback-widget" }] },
];

// PROJETOS (30)
export const projetosOriginais: CuratedProject[] = [
  { id: "signature-generator", title: "Signature Generator", description: "Gerador de assinaturas profissionais para e-mails.", status: "em-desenvolvimento", tipo: "utilitario", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/signature-generator" }] },
  { id: "calculadora", title: "Calculadora", description: "Calculadora básica, exercício de lógica de programação.", status: "mvp", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/calculadora" }] },
  { id: "timeline-app", title: "Timeline App", description: "Aplicação de linha do tempo, exercício de prática.", status: "mvp", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/timeline-app" }] },
  { id: "petshop", title: "Petshop", description: "Aplicação de cadastro para um petshop, projeto de formação.", status: "mvp", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/petshop" }] },
  { id: "to-do-list", title: "To-Do List", description: "Lista de tarefas, exercício de prática com CRUD.", status: "mvp", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/to-do-list" }] },
  { id: "alura-flix", title: "Alura Flix", description: "Catálogo de vídeos ao estilo streaming — projeto de formação da Alura.", status: "mvp", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/alura-flix" }] },
  { id: "biblia", title: "Bíblia", description: "API REST em PHP com MySQL para consultas bíblicas.", status: "em-desenvolvimento", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/biblia" }] },
  { id: "components", title: "Components", description: "Layout para demonstrar os fundamentos do React Router na prática.", status: "mvp", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/components" }] },
  { id: "aircnc", title: "Aircnc", description: "Conecta empresas que querem abrir spots com desenvolvedores.", status: "em-desenvolvimento", tipo: "utilitario", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/aircnc" }] },
  { id: "instagram-feed", title: "Instagram Feed", description: "Clone do feed do Instagram, exercício de prática de layout.", status: "mvp", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/instagram-feed" }] },
  { id: "huntweb-swapi", title: "Huntweb SWAPI", description: "Consome a API SWAPI (Star Wars) e exibe no frontend em ReactJS.", status: "em-desenvolvimento", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/huntweb-swapi" }] },
  { id: "headset", title: "Headset", description: "Projeto para expor informações de um produto.", status: "em-desenvolvimento", tipo: "lp-de-produto", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/headset" }] },
  { id: "marvel", title: "Marvel", description: "Site institucional temático consumindo API.", status: "mvp", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/marvel" }] },
  { id: "oxe-online", title: "Oxe Online", description: "Plataforma para processos seletivos digitais.", status: "em-desenvolvimento", tipo: "utilitario", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/oxe-online" }] },
  { id: "sushibar", title: "Sushibar", description: "Cardápio digital consultando uma API.", status: "em-desenvolvimento", tipo: "lp-de-produto", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/sushibar" }] },
  { id: "letmeask", title: "Letmeask", description: "Salas de Q&A organizadas e democráticas para criadores de conteúdo.", status: "em-desenvolvimento", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/letmeask" }] },
  { id: "rocket-q", title: "Rocket Q", description: "Salas de perguntas para internautas anônimos gerenciadas por senha.", status: "em-desenvolvimento", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/rocket-q" }] },
  { id: "doe-sangue-salve-vidas", title: "Doe Sangue, Salve Vidas", description: "Cadastro de pessoas para doação de sangue.", status: "em-desenvolvimento", tipo: "utilitario", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/doe-sangue-salve-vidas" }] },
  { id: "node-ejs-forms", title: "Node EJS Forms", description: "Estudo de formulários com Node.js e EJS.", status: "mvp", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/node-ejs-forms" }] },
  { id: "my-money-app", title: "My Money App", description: "Ciclos de pagamento com CRUD, gerenciamento de estado e navegação.", status: "em-desenvolvimento", tipo: "financeiro", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/my-money-app" }] },
  { id: "cadastro", title: "Cadastro", description: "Fluxo CRUD completo de cadastro de usuário.", status: "em-desenvolvimento", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/cadastro" }] },
  { id: "todo-app", title: "Todo App", description: "To-do list com fluxo CRUD completo.", status: "em-desenvolvimento", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/todo-app" }] },
  { id: "proffy", title: "Proffy", description: "Cadastro de aulas com horário e conteúdo para interação com alunos.", status: "em-desenvolvimento", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/proffy" }] },
  { id: "niky", title: "Niky", description: "Construção de tarefas atendendo requisitos listados.", status: "em-desenvolvimento", tipo: "utilitario", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/niky" }] },
  { id: "casa-criativa", title: "Casa Criativa", description: "Aplicação para cadastrar e gerenciar ideias criativas.", status: "em-desenvolvimento", tipo: "utilitario", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/casa-criativa" }] },
  { id: "dev-radar", title: "Dev Radar", description: "App inspirado no Waze para localizar desenvolvedores na região.", status: "em-desenvolvimento", tipo: "utilitario", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/dev-radar" }] },
  { id: "valoriza", title: "Valoriza", description: "Backend de uma plataforma para promover reconhecimento entre colegas.", status: "em-desenvolvimento", tipo: "utilitario", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/valoriza" }] },
  { id: "jobs-calc", title: "Jobs Calc", description: "Estimativa de custo para projetos freelancer, com cadastro e exclusão.", status: "em-desenvolvimento", tipo: "utilitario", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/jobs-calc" }] },
  { id: "be-the-hero", title: "Be the Hero", description: "Cadastro de ONGs e causas para captação de apoiadores.", status: "em-desenvolvimento", tipo: "educacional", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/be-the-hero" }] },
  { id: "biblioteca", title: "Biblioteca", description: "Catálogo e gerenciamento de títulos de livros.", status: "em-desenvolvimento", tipo: "projeto", category: "projetos", links: [{ label: "Repositório", url: "https://github.com/douglasabnovato/biblioteca" }] },
];

export const managementBoards: ManagementBoard[] = [
  {
    id: "ecossistema-learntech",
    nome: "Ecossistema-LearnTECH",
    objetivo: "Gestão de tarefas entre as verticais WRITER, DEV e SPEAKER, e frentes de trabalho com clientes.",
    descricao: "Board de gestão pessoal cruzando múltiplas iniciativas, incluindo trabalho para MedTrem e Volta Express Brasil.",
    privado: true,
    quantidadeRepositorios: 0,
    quantidadeIssues: 330,
    url: "https://github.com/users/douglasabnovato/projects/2",
    imagem: boardEcossistemaImg,
  },
  {
    id: "movies-board",
    nome: "movies",
    objetivo: "Aplicação para visualizar filmes conforme regras de negócio.",
    descricao: "Board de gestão do repositório movies — 3 tarefas concluídas (base de UI: favicon, navbar, top) e 8 tarefas em aberto cobrindo arquitetura, funcionalidades de busca/filtro e performance.",
    privado: false,
    quantidadeRepositorios: 1,
    quantidadeIssues: 24,
    url: "https://github.com/users/douglasabnovato/projects/1",
    imagem: boardMoviesImg,
  },
];