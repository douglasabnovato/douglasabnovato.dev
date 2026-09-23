/**
 * Card de registro de comprovação. Não abre arquivo: abre modal, ou leva
 * para a página interna que conta a história com dado ao vivo.
 */

import { Link } from "react-router-dom";
import { ArrowUpRight, FileSearch } from "lucide-react";
import type { RegistroComprovacao } from "../model/types";
import { ROTULO_NATUREZA } from "../model/types";
import { resolverAncora } from "../model/ancora";

interface Props {
  item: RegistroComprovacao;
  onAbrir: (item: RegistroComprovacao) => void;
}

export const RecordCard = ({ item, onAbrir }: Props) => {
  const ancora = resolverAncora(item.ancora);
  const titulo = ancora?.titulo ?? item.organizacao;

  return (
    <article className="flex flex-col gap-3 rounded-lg border border-default bg-surface p-4 transition-colors hover:border-accent">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted">
          {ROTULO_NATUREZA[item.natureza]}
        </span>
        {ancora?.periodo && (
          <span className="shrink-0 text-[10px] font-mono tabular-nums text-muted">
            {ancora.periodo}
          </span>
        )}
      </div>

      <h3 className="text-sm leading-snug text-primary">{titulo}</h3>

      {ancora?.subtitulo && (
        <p className="text-[11px] leading-snug text-secondary">{ancora.subtitulo}</p>
      )}

      <p className="mt-auto pt-1 text-[11px] leading-relaxed text-muted">
        {item.comprova}
      </p>

      {item.destino ? (
        <Link
          to={item.destino}
          className="inline-flex w-fit items-center gap-1 text-[11px] font-mono text-secondary transition-colors hover:text-accent"
        >
          Ver atividade <ArrowUpRight size={11} />
        </Link>
      ) : (
        <button
          onClick={() => onAbrir(item)}
          className="inline-flex w-fit cursor-pointer items-center gap-1 text-[11px] font-mono text-secondary transition-colors hover:text-accent"
        >
          Ver detalhes <FileSearch size={11} />
        </button>
      )}
    </article>
  );
};

// Fim do card de registro.