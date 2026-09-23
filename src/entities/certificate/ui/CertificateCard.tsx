/**
 * Card de certificado com arquivo publicado. O botão abre o documento
 * em nova aba, no visualizador nativo do navegador.
 */

import { ArrowUpRight } from "lucide-react";
import type { CertificadoArquivo } from "../model/types";
import { formatarData } from "../model/formato";

interface Props {
  item: CertificadoArquivo;
}

export const CertificateCard = ({ item }: Props) => {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-default bg-surface p-4 transition-colors hover:border-accent">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted">
          {item.emissor}
        </span>
        <span className="shrink-0 text-[10px] font-mono tabular-nums text-muted">
          {formatarData(item.data)}
        </span>
      </div>

      <h3 className="text-sm leading-snug text-primary">{item.titulo}</h3>

      {item.programa && (
        <p className="text-[11px] leading-snug text-secondary">{item.programa}</p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
        {item.duracao && (
          <span className="text-[10px] font-mono text-muted">{item.duracao}</span>
        )}
        {item.papel && (
          <span className="text-[10px] font-mono text-muted">{item.papel}</span>
        )}
        {item.codigo && (
          <span className="text-[10px] font-mono text-muted">cód. {item.codigo}</span>
        )}
      </div>

      <a
        href={`/arquivos/${item.arquivo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-1 text-[11px] font-mono text-secondary transition-colors hover:text-accent"
      >
        Ver certificado <ArrowUpRight size={11} />
      </a>
    </article>
  );
};

// Fim do card de certificado.