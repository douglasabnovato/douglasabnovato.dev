/**
 * Página do acervo de certificados. Fora do menu: chega-se por ela pelo
 * botão dentro do currículo, e ela segue o mesmo portão de acesso.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";

import { useCertificates } from "@/entities/certificate/model/useCertificates";
import { CertificateCard } from "@/entities/certificate/ui/CertificateCard";
import { RecordCard } from "@/entities/certificate/ui/RecordCard";
import { RecordModal } from "@/entities/certificate/ui/RecordModal";
import type { RegistroComprovacao } from "@/entities/certificate/model/types";
import { useResumeAccess } from "@/entities/resume/model/useResumeAccess";

const SectionHead = ({ title, total }: { title: string; total: number }) => (
  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-default pb-2">
    <h2 className="text-[11px] font-mono uppercase tracking-[0.14em] text-secondary">
      {title} <span className="tabular-nums text-muted">· {total}</span>
    </h2>
  </div>
);

export const Certificados = () => {
  const { isAuthorized } = useResumeAccess();
  const { secoes, indicadores } = useCertificates();
  const [aberto, setAberto] = useState<RegistroComprovacao | null>(null);

  if (!isAuthorized()) {
    return (
      <div className="mx-auto max-w-md px-4 py-24">
        <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-md border border-default bg-surface">
          <Lock size={15} className="text-muted" />
        </div>
        <h1 className="mb-3 text-xl font-medium text-primary">Acervo restrito</h1>
        <p className="mb-8 text-sm leading-relaxed text-secondary">
          O acervo de certificados é liberado junto com o currículo.
        </p>
        <Link
          to="/curriculo"
          className="inline-flex items-center gap-2 rounded-md border border-default bg-surface px-4 py-2 font-mono text-xs text-primary transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={13} /> Ir para o currículo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
      <header className="border-b border-default pb-8">
        <Link
          to="/curriculo"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={11} /> Currículo
        </Link>
        <h1 className="mt-3 text-2xl font-medium tracking-tight text-primary">
          Acervo de certificados
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-secondary">
          Cursos, eventos e registros de comprovação, agrupados por natureza e
          ordenados do mais recente ao mais antigo.
        </p>
      </header>

      <section className="grid grid-cols-2 divide-x divide-y divide-[color:var(--color-border)] border-b border-default lg:grid-cols-4 lg:divide-y-0">
        {[
          { valor: indicadores.total, label: "itens no acervo" },
          { valor: indicadores.certificados, label: "com certificado publicado" },
          { valor: indicadores.horas, label: "horas somadas" },
          { valor: indicadores.desde ?? "—", label: "desde" },
        ].map((item) => (
          <div key={item.label} className="px-4 py-6 first:pl-0">
            <span className="block font-mono text-3xl tabular-nums text-primary">
              {item.valor}
            </span>
            <span className="mt-2 block text-[11px] leading-snug text-secondary">
              {item.label}
            </span>
          </div>
        ))}
      </section>

      <p className="mt-6 rounded-md border-l-2 border-[color:var(--color-border-strong)] bg-surface p-3 text-[11px] leading-relaxed text-muted">
        Os itens marcados como registro de comprovação têm documento, mas o
        original não é publicado por conter dados pessoais e contratuais. O
        conteúdo dos cards foi extraído deles e pode ser comprovado mediante
        solicitação.
      </p>

      {secoes.map((secao) => (
        <section key={secao.id} id={secao.id} className="mt-[var(--space-block)]">
          <SectionHead title={secao.label} total={secao.total} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secao.itens.map((item) =>
              item.evidencia === "arquivo" ? (
                <CertificateCard key={item.id} item={item} />
              ) : (
                <RecordCard key={item.id} item={item} onAbrir={setAberto} />
              ),
            )}
          </div>
        </section>
      ))}

      {aberto && <RecordModal item={aberto} onFechar={() => setAberto(null)} />}
    </div>
  );
};

// Fim da página do acervo.