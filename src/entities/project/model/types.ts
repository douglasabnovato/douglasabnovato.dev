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
}

export interface CuratedProject {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  links: ProjectLink[];
  accentColor?: string;
  placeholder?: boolean;
}