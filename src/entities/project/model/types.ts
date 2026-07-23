export interface CuratedProject {
  id: string;
  title: string;
  description: string;
  url: string;
  featured: boolean;
  accentColor?: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}