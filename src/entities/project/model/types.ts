export type ProjectCategory =
  | "especial"
  | "destaque"
  | "projetos-originais"
  | "formacao-projetos"
  | "formacao-conteudos"
  | "templates-institucionais";

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
}

export interface ManagementBoard {
  id: string;
  nome: string;
  objetivo: string;
  descricao: string;
  privado: boolean;
  quantidadeRepositorios: number;
  quantidadeIssues: number;
  url: string;
}