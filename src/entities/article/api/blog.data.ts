/**
 * Dados do acervo do Medium.
 *
 * Apurados em 20/09/2026 a partir da tela Stats > Stories do Medium, que
 * lista todas as publicações com tempo de leitura, data, visualizações e
 * leituras. O feed RSS entrega só os 10 mais recentes e não sabe nada disso.
 *
 * Para atualizar depois de publicar: some 1 em mediumTotal, some 1 no ano
 * corrente em yearly, e atualize totalViews e totalReads na próxima revisão.
 * Nenhum componente precisa ser tocado.
 *
 * A classificação em sete grupos foi feita título a título. Se algum artigo
 * estiver no grupo errado, o ajuste é aqui, nos contadores.
 */

import type { BlogMeta } from "../model/types";

export const MEDIUM_PROFILE = "https://douglasabnovato.medium.com";

export const blogIntro =
  "Escrevo sobre o que acontece quando educação, logística e e-commerce exigem a mesma coisa da tecnologia.";

export const blogMethod =
  "Escolho o próximo tema revisando estes números, cruzando com publicações internacionais e Google Trends, e filtrando pelo que estou vivendo no momento.";

export const blogCurveNote =
  "O volume acompanha as transições de carreira: alto nos anos de estudo e migração para desenvolvimento, baixo nos anos de operação e CRM em tempo integral, retomado em 2026.";

export const blogMethodNotes = [
  "Três artigos somam 79 mil das 165.601 visualizações — 48% do alcance vem de 1,2% do acervo. Comparar grupos pela média é enganoso enquanto esses três estiverem dentro.",
  "Visualizações por ano ficaram de fora: artigos antigos acumularam anos de exposição e a distribuição da plataforma mudou no período. Os dois efeitos não se separam com os dados disponíveis.",
];

export const blogClosing =
  "O conteúdo sobre carreira e aprendizado foi ganhando espaço porque era o que alcançava e era o que eu tinha para contar. Hoje é o que faço em tempo integral: formação de desenvolvedores.";

export const blogMeta: BlogMeta = {
  mediumTotal: 257,
  mediumSince: 2014,
  mediumUntil: 2026,
  totalMinutes: 1422,
  totalViews: 165601,
  totalReads: 75893,

  priorOutlet: {
    outlet: "Oficina da Net",
    period: "2014 – 2015",
    count: 32,
  },

  editorial: [
    {
      id: "construir",
      title: "Construir",
      scope: "Como as ferramentas funcionam por dentro: frontend, backend e fluxo de trabalho.",
      count: 102,
      active: true,
    },
    {
      id: "entrar",
      title: "Entrar",
      scope: "O caminho até a primeira vaga: processo seletivo, portfólio, entrevista técnica.",
      count: 57,
      active: true,
    },
    {
      id: "aprender",
      title: "Aprender",
      scope: "Método de estudo, lógica de programação e os cursos que fiz, por dentro.",
      count: 40,
      active: true,
    },
    {
      id: "observar",
      title: "Observar",
      scope: "Tecnologia vista de fora do código: comportamento, negócio e o que muda no mercado.",
      count: 58,
      active: true,
    },
    {
      id: "ingles",
      title: "Em inglês",
      scope: "Artigos escritos em inglês, para alcance fora do Brasil.",
      active: false,
    },
  ],

  yearly: [
    { year: 2014, count: 30 },
    { year: 2015, count: 2 },
    { year: 2016, count: 2 },
    { year: 2017, count: 1 },
    { year: 2018, count: 0 },
    { year: 2019, count: 11 },
    { year: 2020, count: 76 },
    { year: 2021, count: 62 },
    { year: 2022, count: 46 },
    { year: 2023, count: 16 },
    { year: 2024, count: 0 },
    { year: 2025, count: 1 },
    { year: 2026, count: 10 },
  ],

  topics: [
    { id: "tecnologia", label: "Tecnologia e comportamento", count: 26, views: 48633, readRate: 52.3 },
    { id: "carreira", label: "Carreira e primeira vaga", count: 57, views: 36540, readRate: 38.5 },
    { id: "fundamentos", label: "Fundamentos e como aprender", count: 40, views: 36058, readRate: 42.8 },
    { id: "frontend", label: "JavaScript e frontend", count: 74, views: 33437, readRate: 49.2 },
    { id: "backend", label: "Backend, dados e SQL", count: 16, views: 5992, readRate: 47.1 },
    { id: "ferramentas", label: "Ferramentas e fluxo de trabalho", count: 12, views: 4069, readRate: 34.8 },
    {
      id: "jornalismo",
      label: "Jornalismo de tecnologia",
      count: 32,
      views: 872,
      readRate: 31.3,
      note: "Coluna de 2014–2015, importada para o Medium quando o perfil ainda não tinha público.",
    },
  ],

  topRead: [
    { title: "O que eu NÃO gosto de fazer?", year: 2020, views: 30000, reads: 16600 },
    { title: "Quais os testes de raciocínio lógico treinar?", year: 2021, views: 28000, reads: 11500 },
    { title: "O que o programador Jr. precisa saber?", year: 2020, views: 21000, reads: 6900 },
    { title: "Um Quiz App com HTML, CSS e JS", year: 2019, views: 11400, reads: 7100 },
    { title: "A 42 São Paulo na prática", year: 2020, views: 7700, reads: 4100 },
    { title: "Como treinar para um teste de lógica?", year: 2020, views: 5700, reads: 1700 },
    { title: "Qual a rotina de um programador?", year: 2020, views: 4700, reads: 1100 },
    { title: "Como construir um portfólio de desenvolvedor", year: 2020, views: 3100, reads: 2200 },
  ],
};

/** Fim dos dados do acervo. */