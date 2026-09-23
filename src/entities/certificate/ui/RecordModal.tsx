/**
 * Modal de um registro de comprovação. Usa os tokens de tema do projeto,
 * fecha no Escape e no clique fora, e trava a rolagem do fundo enquanto aberto.
 */

import { useEffect } from "react";
import { X } from "lucide-react";
import type { RegistroComprovacao } from "../model/types";
import { ROTULO_NATUREZA } from "../model/types";
import { resolverAncora } from "../model/ancora";

interface Props {
  item: RegistroComprovacao;
  onFechar: () => void;
}

export const RecordModal = ({ item, onFechar }: Props) => {
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    document.addEventListener("keydown", aoTeclar);
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = anterior;
    };
  }, [onFechar]);

  const ancora = resolverAncora(item.ancora);
  const titulo = ancora?.titulo ?? item.organizacao;

  return (
    <div
      onClick={onFechar}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-12"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl border border-default bg-surface-solid p-6 shadow-xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-default pb-4">
          <div className="min-w-0">
            <span className="block text-[10px] font-mono uppercase tracking-[0.12em] text-muted">
              {ROTULO_NATUREZA[item.natureza]}
            </span>
            <h2 className="mt-1.5 text-lg font-medium leading-tight text-primary">
              {titulo}
            </h2>
            {ancora?.subtitulo && (
              <p className="mt-1 text-sm text-secondary">{ancora.subtitulo}</p>
            )}
            {ancora?.periodo && (
              <p className="mt-1 text-[11px] font-mono tabular-nums text-muted">
                {ancora.periodo}
              </p>
            )}
          </div>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="shrink-0 cursor-pointer text-secondary transition-colors hover:text-primary"
          >
            <X size={18} />
          </button>
        </div>

        {ancora?.texto && (
          <p className="mb-5 text-sm leading-relaxed text-secondary">{ancora.texto}</p>
        )}

        {ancora?.itens && ancora.itens.length > 0 && (
          <ul className="mb-5 space-y-2">
            {ancora.itens.map((linha) => (
              <li key={linha} className="flex gap-2.5 text-sm leading-relaxed text-secondary">
                <span className="select-none text-muted">—</span>
                <span>{linha}</span>
              </li>
            ))}
          </ul>
        )}

        <dl className="space-y-3 border-t border-default pt-4">
          <div>
            <dt className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted">
              Documento
            </dt>
            <dd className="mt-0.5 text-sm text-secondary">{item.documento}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted">
              Comprova
            </dt>
            <dd className="mt-0.5 text-sm text-secondary">{item.comprova}</dd>
          </div>
        </dl>

        {item.nota && (
          <p className="mt-5 rounded-md border-l-2 border-[color:var(--color-border-strong)] bg-surface p-3 text-[11px] leading-relaxed text-muted">
            {item.nota}
          </p>
        )}
      </div>
    </div>
  );
};

// Fim do modal de registro.