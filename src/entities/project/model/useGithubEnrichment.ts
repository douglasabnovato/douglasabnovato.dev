import { useEffect, useState } from "react";
import { fetchGithubRepos } from "@/entities/github/api/githubApi";
import { getCachedData, getStaleData, setCachedData } from "@/shared/lib/localCache";
import type { CuratedProject } from "./types";

interface RepoEnrichment {
  homepage: string | null;
  openIssuesCount: number;
}

const CACHE_KEY = "projetos-github-enrichment";

function extractRepoName(url: string): string | null {
  const match = url.match(/github\.com\/[^/]+\/([^/]+)/);
  return match ? match[1] : null;
}

export function useGithubEnrichment() {
  const [enrichment, setEnrichment] = useState<Record<string, RepoEnrichment>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const cached = getCachedData<Record<string, RepoEnrichment>>(CACHE_KEY);
      if (cached) {
        setEnrichment(cached.data);
        setLoading(false);
        return;
      }
      try {
        const repos = await fetchGithubRepos();
        const map: Record<string, RepoEnrichment> = {};
        repos.forEach((repo) => {
          map[repo.name.toLowerCase()] = {
            homepage: repo.homepage,
            openIssuesCount: repo.open_issues_count,
          };
        });
        setCachedData(CACHE_KEY, map);
        setEnrichment(map);
      } catch {
        const stale = getStaleData<Record<string, RepoEnrichment>>(CACHE_KEY);
        if (stale) setEnrichment(stale.data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { enrichment, loading };
}

export function enrichProject(project: CuratedProject, enrichment: Record<string, RepoEnrichment>): CuratedProject {
  const repoLink = project.links.find((l) => l.url.includes("github.com"));
  const repoName = repoLink ? extractRepoName(repoLink.url) : null;
  const data = repoName ? enrichment[repoName.toLowerCase()] : undefined;
  if (!data) return project;

  const jaTemAcessar = project.links.some((l) => l.hospedado);
  const links = data.homepage && !jaTemAcessar
    ? [{ label: "Acessar", url: data.homepage, hospedado: true }, ...project.links]
    : project.links;

  return { ...project, links, issuesAbertas: data.openIssuesCount };
}