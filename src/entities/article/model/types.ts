/**
 * Modelo da entidade artigo.
 *
 * Fonte: feed RSS do Medium, via rss2json. Tempo de leitura, presença de
 * código, capa e excerto são derivados do HTML do corpo dentro do hook.
 * O feed não traz palmas, comentários nem visualizações — esses dados não
 * existem e por isso não aparecem aqui.
 */

export interface Article {
  id: string;
  seq?: number;
  title: string;
  link: string;
  isoDate: string;
  dateLabel: string;
  excerpt: string;
  categories: string[];
  cover: string;
  readMinutes: number;
  words: number;
  hasCode: boolean;
}

export type ArticleFeedState = "loading" | "ok" | "stale" | "error";

export interface EditorialLine {
  id: string;
  title: string;
  scope: string;
  active: boolean;
}

export interface PriorOutlet {
  outlet: string;
  period: string;
  count: number;
  url?: string;
}

export interface BlogMeta {
  mediumTotal: number;
  mediumSince: number;
  priorOutlet?: PriorOutlet;
  editorial: EditorialLine[];
}

/** Fim do modelo da entidade artigo. */