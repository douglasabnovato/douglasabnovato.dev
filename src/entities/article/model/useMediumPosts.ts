import { useEffect, useState } from "react";
import type { Article } from "./types";

const MEDIUM_USERNAME = "douglasabnovato";
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function useMediumPosts() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(RSS2JSON_URL);
        if (!res.ok) throw new Error(`Erro ao buscar artigos: ${res.status}`);
        const data = await res.json();
        if (data.status !== "ok") throw new Error("Feed retornou status de erro");

        const parsed: Article[] = data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          thumbnail: item.thumbnail || "",
          description: stripHtml(item.description).slice(0, 160),
          categories: item.categories || [],
        }));

        setArticles(parsed);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar artigos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { articles, loading, error };
}