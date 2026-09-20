/**
 * Leitura do feed do Medium.
 *
 * O RSS do Medium não é acessível direto do navegador por falta de CORS,
 * por isso a ponte é o rss2json. O feed devolve no máximo 10 artigos e não
 * é paginável.
 *
 * Os itens crus vão para o cache; a derivação roda em memória a cada render,
 * de modo que mudar mediumTotal em blog.data.ts se reflete na hora, sem
 * invalidar o cache.
 */

import { useEffect, useMemo, useState } from "react";
import { getCachedData, getStaleData, setCachedData } from "@/shared/lib/localCache";
import { blogMeta } from "../api/blog.data";
import type { Article, ArticleFeedState } from "./types";

const MEDIUM_USERNAME = "douglasabnovato";
const FEED_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;
const CACHE_KEY = "blog:medium-feed";
const PALAVRAS_POR_MINUTO = 265;
const SEGUNDOS_POR_IMAGEM = 12;
const MINIMO_EXCERTO = 60;
const LIMITE_EXCERTO = 150;
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

interface RawItem {
  title?: string;
  link?: string;
  pubDate?: string;
  categories?: string[];
  content?: string;
  description?: string;
}

/** Remove os parâmetros de rastreio que o Medium anexa ao link do feed. */
function cleanLink(url: string): string {
  const cut = url.indexOf("?");
  return cut === -1 ? url : url.slice(0, cut);
}

/** "2020-09-06 12:00:00" vira "2020-09-06", sem conversão de fuso. */
function toIsoDate(pubDate: string): string {
  return pubDate.slice(0, 10);
}

/** "2020-09-06" vira "set 2020". */
function toDateLabel(iso: string): string {
  const [ano, mes] = iso.split("-");
  const indice = Number(mes) - 1;
  return `${MESES[indice] ?? "—"} ${ano ?? ""}`.trim();
}

/** Converte o HTML do corpo em documento inerte, sem carregar recursos. */
function parseBody(html: string): Document {
  return new DOMParser().parseFromString(html, "text/html");
}

/** Primeiro parágrafo com corpo suficiente para servir de resumo. */
function firstParagraph(doc: Document): string {
  const paragrafos = Array.from(doc.querySelectorAll("p"));
  for (const p of paragrafos) {
    const texto = (p.textContent ?? "").trim();
    if (texto.length >= MINIMO_EXCERTO) return texto;
  }
  return "";
}

/** Corta em palavra inteira e fecha com reticência. */
function cut(texto: string, limite: number): string {
  if (texto.length <= limite) return texto;
  const parcial = texto.slice(0, limite);
  const espaco = parcial.lastIndexOf(" ");
  return `${parcial.slice(0, espaco > 0 ? espaco : limite)}…`;
}

/** Fórmula do próprio Medium: 265 palavras por minuto mais 12s por imagem. */
function readingMinutes(palavras: number, imagens: number): number {
  const minutos = palavras / PALAVRAS_POR_MINUTO + (imagens * SEGUNDOS_POR_IMAGEM) / 60;
  return Math.max(1, Math.round(minutos));
}

/** Monta o artigo derivando tudo que o feed não entrega pronto. */
function toArticle(raw: RawItem, index: number, total: number): Article {
  const html = raw.content ?? raw.description ?? "";
  const doc = parseBody(html);
  const texto = (doc.body.textContent ?? "").trim();
  const palavras = texto.length === 0 ? 0 : texto.split(/\s+/).length;
  const imagens = doc.querySelectorAll("img").length;
  const iso = toIsoDate(raw.pubDate ?? "");
  const link = cleanLink(raw.link ?? "");

  return {
    id: link || `artigo-${index}`,
    seq: total > 0 ? total - index : undefined,
    title: raw.title ?? "Sem título",
    link,
    isoDate: iso,
    dateLabel: toDateLabel(iso),
    excerpt: cut(firstParagraph(doc), LIMITE_EXCERTO),
    categories: raw.categories ?? [],
    cover: doc.querySelector("img")?.getAttribute("src") ?? "",
    readMinutes: readingMinutes(palavras, imagens),
    words: palavras,
    hasCode: doc.querySelector("pre, code") !== null,
  };
}

/** Lê o feed, guarda os itens crus e deriva os artigos em memória. */
export function useMediumPosts() {
  const [items, setItems] = useState<RawItem[] | null>(null);
  const [state, setState] = useState<ArticleFeedState>("loading");

  useEffect(() => {
    let active = true;

    const cached = getCachedData<RawItem[]>(CACHE_KEY);
    if (cached) {
      setItems(cached.data);
      setState("ok");
      return;
    }

    fetch(FEED_URL)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        if (data?.status !== "ok" || !Array.isArray(data.items)) {
          throw new Error("feed invalido");
        }
        const brutos = data.items as RawItem[];
        setCachedData(CACHE_KEY, brutos);
        setItems(brutos);
        setState("ok");
      })
      .catch(() => {
        if (!active) return;
        const stale = getStaleData<RawItem[]>(CACHE_KEY);
        if (stale) {
          setItems(stale.data);
          setState("stale");
        } else {
          setState("error");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const articles = useMemo(
    () => (items ?? []).map((raw, index) => toArticle(raw, index, blogMeta.mediumTotal)),
    [items],
  );

  return { articles, state };
}

/** "hoje", "há 3 dias", "há 2 anos" — sem biblioteca. */
export function relativeTime(iso: string): string {
  const days = Math.floor((Date.now() - new Date(`${iso}T12:00:00`).getTime()) / 86_400_000);
  if (days <= 0) return "hoje";
  if (days === 1) return "ontem";
  if (days < 30) return `há ${days} dias`;
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? "há 1 mês" : `há ${months} meses`;
  const years = Math.floor(months / 12);
  return years === 1 ? "há 1 ano" : `há ${years} anos`;
}

/** Fim da leitura do feed do Medium. */