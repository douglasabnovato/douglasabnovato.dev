/**
 * Modelo da entidade artigo.
 *
 * Duas fontes distintas e independentes. O feed RSS do Medium, via rss2json,
 * alimenta os artigos recentes e é lido a cada visita. Os números do acervo
 * — total, série por ano, grupos temáticos e mais lidos — vêm da tela de
 * estatísticas do Medium, foram apurados uma vez e ficam em blog.data.ts.
 *
 * O feed não traz palmas, comentários nem visualizações por artigo. Esses
 * dados não existem e por isso não aparecem neste modelo.
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
  count?: number;
  active: boolean;
}

export interface PriorOutlet {
  outlet: string;
  period: string;
  count: number;
  url?: string;
}

export interface YearPoint {
  year: number;
  count: number;
}

export interface TopicGroup {
  id: string;
  label: string;
  count: number;
  views: number;
  readRate: number;
  note?: string;
}

export interface TopArticle {
  title: string;
  year: number;
  views: number;
  reads: number;
  url?: string;
}

export interface BlogMeta {
  mediumTotal: number;
  mediumSince: number;
  mediumUntil: number;
  totalMinutes: number;
  totalViews: number;
  totalReads: number;
  priorOutlet?: PriorOutlet;
  editorial: EditorialLine[];
  yearly: YearPoint[];
  topics: TopicGroup[];
  topRead: TopArticle[];
}

/** Fim do modelo da entidade artigo. */