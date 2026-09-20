export type ProjectCategory =
  | "profile"
  | "especial"
  | "top"
  | "mvp"
  | "projetos";

export interface ProjectLink {
  label: string;
  url: string;
  hospedado?: boolean;
}

export type ProjectStatus = "em-desenvolvimento" | "mvp";

export type ProjectType = "educacional" | "site-institucional" | "lp-de-produto" | "financeiro" | "utilitario" | "projeto";

export interface CuratedProject {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  links: ProjectLink[];
  accentColor?: string;
  placeholder?: boolean;
  tag?: string;
  status?: ProjectStatus;
  tipo?: ProjectType;
  issuesAbertas?: number;
}

export interface BoardMetric {
  label: string;
  value: string;
}

export interface ManagementBoard {
  id: string;
  nome: string;
  publico: boolean;
  kicker: string;
  resumo: string;
  metodo?: string;
  visoes: string[];
  metricas?: BoardMetric[];
  url?: string;
  repoUrl?: string;
  issuesUrl?: string;
  imagem: string;
  ponte?: string;
}


/* ------------------------------------------------------------------ */
/* Catálogo ao vivo — o que a página de Projetos consome               */
/* ------------------------------------------------------------------ */

export type ProjectSectionId =
  | "especiais"
  | "destaques"
  | "mvp"
  | "projetos"
  | "forks"
  | "arquivados";

export interface CatalogProject {
  id: number;
  name: string;
  section: ProjectSectionId;
  title: string;
  description: string;
  createdYear: number;
  pushedAt: string;
  openIssues: number;
  commits?: number;
  techTopics: string[];
  homepage: string | null;
  repoUrl: string;
  isFork: boolean;
  isArchived: boolean;
  isCourse: boolean;
  tag?: string;
  accentColor?: string;
}

export interface CatalogSection {
  id: ProjectSectionId;
  label: string;
  total: number;
  items: CatalogProject[];
}

export interface CatalogIndicators {
  repositorios: number;
  ativos30d: number;
  issuesAbertas: number;
  noAr: number;
}