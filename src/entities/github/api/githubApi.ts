import type { GithubRepo, GithubGist, GithubOrg, GithubUser } from "../model/types";

const USERNAME = "douglasabnovato";
const ORG = "learnTECH-community";

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  // Uma chamada só: 100 itens cobrem a conta inteira. A segunda página
  // desperdiçava metade do orçamento de 60 requisições/hora.
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`
  );
  if (!res.ok) throw new Error(`Erro ao buscar repositórios: ${res.status}`);
  return res.json();
}

export function hasProductionLink(repo: GithubRepo): boolean {
  return Boolean(repo.homepage && repo.homepage.trim().length > 0);
}

export async function fetchGists(): Promise<GithubGist[]> {
  // Primeira página apenas: 100 dos mais recentes. Varrer as 7 páginas do
  // acervo custaria 7 das 60 requisições/hora e mais de 1 MB no localStorage.
  const res = await fetch(`https://api.github.com/users/${USERNAME}/gists?per_page=100`);
  if (!res.ok) throw new Error(`Erro ao buscar gists: ${res.status}`);
  return res.json();
}

/** Traz as contagens totais da conta — inclusive o número real de gists. */
export async function fetchUserProfile(): Promise<GithubUser> {
  const res = await fetch(`https://api.github.com/users/${USERNAME}`);
  if (!res.ok) throw new Error(`Erro ao buscar perfil: ${res.status}`);
  return res.json();
}

export async function fetchOrgInfo(): Promise<GithubOrg> {
  const res = await fetch(`https://api.github.com/orgs/${ORG}`);
  if (!res.ok) throw new Error(`Erro ao buscar organização: ${res.status}`);
  return res.json();
}