/**
 * Modelo único do currículo.
 *
 * Regra de conteúdo: só entra aqui o que é verificável ou foi confirmado.
 * Nada de nível de habilidade, nota, percentual de proficiência ou
 * estimativa apresentada como número.
 */

/** Mantido por compatibilidade com a Home, que filtra por tier === 'atual'. */
export type ExperienceTier = "atual" | "recente" | "condensado";

/** Profundidade de leitura na página. */
export type ExperienceDepth = "full" | "medium" | "line";

/** Trilhas da faixa temporal. Uma cor por trilha, definida em main.css. */
export type TrackId =
  | "desenvolvimento"
  | "produto"
  | "dados"
  | "operacao"
  | "educacao"
  | "transicao";

export interface Experience {
  id: string;
  company: string;
  role: string;
  /** Rótulo legível: "mar/2021 – presente". */
  period: string;
  /** "AAAA-MM". Ausente quando a data exata ainda não foi confirmada. */
  start?: string;
  /** "AAAA-MM", ou null quando é o cargo atual. */
  end?: string | null;
  tier: ExperienceTier;
  depth: ExperienceDepth;
  track: TrackId;
  /** Uma frase sobre o negócio/contexto. */
  context?: string;
  /** Entregas verificáveis. */
  deliverables?: string[];
  /** Ferramentas efetivamente usadas nesta experiência. */
  stack?: string[];
  /** Campos legados, usados por ExperienceBlock. */
  highlights?: string[];
  status?: "confirmado" | "a confirmar";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  completed: boolean;
  note?: string;
}

export interface CommunityItem {
  id: string;
  title: string;
  role?: string;
  period: string;
  detail?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  period: string;
  detail?: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string;
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
}

export interface KeyFigure {
  id: string;
  label: string;
  /** Valor estático. Quando ausente, vem de fonte ao vivo. */
  value?: string;
  source: string;
  live?: "repos" | "producao";
}

export interface ResumeData {
  name: string;
  shortName: string;
  location: string;
  headline: string;
  summary: string;
  objective: string;
  careerStart: number;
  figures: KeyFigure[];
  contacts: ContactLink[];
  experiences: Experience[];
  education: Education[];
  community: CommunityItem[];
  publications: PublicationItem[];
  languages: LanguageItem[];
}

export const TRACK_LABEL: Record<TrackId, string> = {
  desenvolvimento: "Desenvolvimento",
  produto: "Produto",
  dados: "Dados e CRM",
  operacao: "Operação",
  educacao: "Educação e conteúdo",
  transicao: "Transição",
};

export const TRACK_VAR: Record<TrackId, string> = {
  desenvolvimento: "var(--track-desenvolvimento)",
  produto: "var(--track-produto)",
  dados: "var(--track-dados)",
  operacao: "var(--track-operacao)",
  educacao: "var(--track-educacao)",
  transicao: "var(--track-transicao)",
};