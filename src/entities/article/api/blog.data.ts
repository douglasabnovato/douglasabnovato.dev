/**
 * Dados do blog que o feed não entrega.
 *
 * O RSS do Medium devolve os 10 artigos mais recentes e nada além disso:
 * não há total, não há data de início, não há histórico. Tudo isso mora
 * neste arquivo e é atualizado aqui, sem tocar em componente.
 *
 * A preencher:
 *   mediumTotal   — quantos artigos você tem hoje no Medium.
 *                   Em 0, a numeração #N e o indicador de total não aparecem.
 *   mediumSince   — ano do primeiro artigo no Medium.
 *                   Em 0, o indicador de período não aparece.
 *   priorOutlet.count — quantidade na Oficina da Net.
 *                   Em 0, a linha aparece sem número.
 *
 * Em editorial, active: false não renderiza. Vire para true quando a linha
 * passar a ter artigo publicado.
 */

import type { BlogMeta } from "../model/types";

export const MEDIUM_PROFILE = "https://douglasabnovato.medium.com";

export const blogIntro =
  "Escrevo sobre o que acontece quando educação, logística e e-commerce exigem a mesma coisa da tecnologia.";

export const blogMeta: BlogMeta = {
  mediumTotal: 0,
  mediumSince: 0,
  priorOutlet: {
    outlet: "Oficina da Net",
    period: "2014 – 2015",
    count: 0,
  },
  editorial: [
    {
      id: "tecnologia",
      title: "Tecnologia e produto",
      scope:
        "Como as ferramentas funcionam por dentro e que decisão elas impõem a quem constrói.",
      active: true,
    },
    {
      id: "trabalho",
      title: "Trabalho e times",
      scope:
        "Comportamento, coordenação e as combinações que fazem um time entregar — ou travar.",
      active: true,
    },
    {
      id: "eventos",
      title: "Eventos e comunidade",
      scope:
        "Registro do que acontece nos encontros de tecnologia que acompanho e organizo.",
      active: true,
    },
    {
      id: "ponto-de-vista",
      title: "Ponto de vista",
      scope: "Análise e opinião sobre o que está sendo dito no mercado.",
      active: true,
    },
    {
      id: "ingles",
      title: "Em inglês",
      scope: "Artigos escritos em inglês, para alcance fora do Brasil.",
      active: false,
    },
  ],
};

/** Fim dos dados do blog. */