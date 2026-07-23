import type { GithubRepo, GithubIssue, GithubGist, GithubOrg } from "../model/types";

const USERNAME = "douglasabnovato";
const ORG = "learnTECH-community";

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error(`Erro ao buscar repositórios: ${res.status}`);
    return res.json();
}

export function hasProductionLink(repo: GithubRepo): boolean {
    return Boolean(repo.homepage && repo.homepage.trim().length > 0);
}

export async function fetchOpenIssuesForRepo(repoName: string): Promise<GithubIssue[]> {
    const res = await fetch(`https://api.github.com/repos/${USERNAME}/${repoName}/issues?state=open&per_page=20`);
    if (!res.ok) throw new Error(`Erro ao buscar issues de ${repoName}: ${res.status}`);
    const data = await res.json();
    return data
        .filter((item: any) => !item.pull_request)
        .map((item: any) => ({
            id: item.id,
            number: item.number,
            title: item.title,
            html_url: item.html_url,
            state: item.state,
            repository: repoName,
            labels: item.labels.map((l: any) => (typeof l === "string" ? l : l.name)),
            created_at: item.created_at,
        }));
}

export async function fetchGists(): Promise<GithubGist[]> {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/gists`);
    if (!res.ok) throw new Error(`Erro ao buscar gists: ${res.status}`);
    return res.json();
}

export async function fetchOrgInfo(): Promise<GithubOrg> {
    const res = await fetch(`https://api.github.com/orgs/${ORG}`);
    if (!res.ok) throw new Error(`Erro ao buscar organização: ${res.status}`);
    return res.json();
}