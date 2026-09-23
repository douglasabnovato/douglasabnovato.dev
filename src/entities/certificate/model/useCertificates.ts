/**
 * Agrupa o acervo por seção e ordena cada seção do mais recente para o mais antigo.
 * A ordem das seções vem de ORDEM_SECOES; seção não declarada vai para o fim.
 */

import { useMemo } from "react";
import { certificates } from "./certificates.data";
import { ORDEM_SECOES } from "./types";
import type { Certificate } from "./types";

export interface SecaoAcervo {
  id: string;
  label: string;
  total: number;
  itens: Certificate[];
}

/** Converte "AAAA", "AAAA-MM" e "AAAA-MM-DD" em um número comparável. */
function chaveTemporal(data: string): number {
  const [ano, mes, dia] = data.split("-");
  return Number(ano) * 10000 + Number(mes ?? "12") * 100 + Number(dia ?? "28");
}

/** Monta as seções e os indicadores do topo da página. */
export function useCertificates() {
  return useMemo(() => {
    const mapa = new Map<string, Certificate[]>();
    certificates.forEach((item) => {
      const lista = mapa.get(item.secao) ?? [];
      lista.push(item);
      mapa.set(item.secao, lista);
    });

    const secoes: SecaoAcervo[] = [...mapa.entries()]
      .map(([label, itens]) => ({
        id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        label,
        total: itens.length,
        itens: itens.sort((a, b) => chaveTemporal(b.data) - chaveTemporal(a.data)),
      }))
      .sort((a, b) => {
        const ia = ORDEM_SECOES.indexOf(a.label);
        const ib = ORDEM_SECOES.indexOf(b.label);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });

    const comArquivo = certificates.filter((c) => c.evidencia === "arquivo");
    const horas = comArquivo.reduce(
      (soma, c) => soma + (c.evidencia === "arquivo" ? c.horas ?? 0 : 0),
      0,
    );
    const anos = certificates.map((c) => Number(c.data.slice(0, 4)));

    return {
      secoes,
      indicadores: {
        total: certificates.length,
        certificados: comArquivo.length,
        horas: Math.round(horas),
        desde: anos.length ? Math.min(...anos) : null,
      },
    };
  }, []);
}

// Fim do agrupador do acervo.