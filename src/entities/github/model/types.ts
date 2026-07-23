export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  open_issues_count: number;
  updated_at: string;
}

export interface GithubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  repository: string;
  labels: string[];
  created_at: string;
}

export interface GithubGist {
  id: string;
  description: string | null;
  html_url: string;
  files: Record<string, { filename: string; language: string | null }>;
  created_at: string;
}

export interface GithubOrg {
  login: string;
  name: string | null;
  description: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  public_repos: number;
}