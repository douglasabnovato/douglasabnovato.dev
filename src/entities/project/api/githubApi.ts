import type { GithubRepo } from "../model/types";

const GITHUB_USERNAME = "douglasabnovato";

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
    const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    );

    if (!response.ok) {
        throw new Error(`Erro ao buscar repositórios: ${response.status}`);
    }

    return response.json();
}

export function hasProductionLink(repo: GithubRepo): boolean {
    return Boolean(repo.homepage && repo.homepage.trim().length > 0);
}