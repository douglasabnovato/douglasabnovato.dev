/**
 * Modelo do acervo de certificados.
 *
 * Uma entidade, três formas de evidência. O que muda entre elas é apenas
 * o destino do botão do card — grid, ordenação e seção são idênticos.
 *
 * Regra de conteúdo: nenhum campo é inventado. O que vem do documento vem
 * do documento; o que vem da trajetória é lido do resume.data.ts pela âncora.
 */

/** De onde vem a prova daquele item. */
export type Evidencia = "arquivo" | "registro" | "ao-vivo";

/** Natureza do documento que sustenta um registro de comprovação. */
export type Natureza = "oficial" | "nao-oficial" | "ao-vivo";

interface Base {
  id: string;
  /** Rótulo da seção na grid. A ordem vem de ORDEM_SECOES. */
  secao: string;
  /** "AAAA-MM-DD", "AAAA-MM" ou "AAAA". Governa a ordenação. */
  data: string;
  evidencia: Evidencia;
}

/** Certificado com arquivo publicado, aberto em nova aba. */
export interface CertificadoArquivo extends Base {
  evidencia: "arquivo";
  emissor: string;
  titulo: string; 
  arquivo: string;
  programa?: string;
  tipo?: string; 
  duracao?: string;
  horas?: number;
  emissao?: string;
  papel?: string;
  evento?: string;
  codigo?: string;
}

/** Registro de comprovação: o documento existe, mas não é publicado. */
export interface RegistroComprovacao extends Base {
  evidencia: "registro" | "ao-vivo";
  natureza: Natureza;
  /** Id de um item do resume.data.ts. O card lê organização e período de lá. */
  ancora: string;
  /** Fallback para quando não há âncora correspondente. */
  organizacao: string;
  /** Que documento sustenta o registro. */
  documento: string;
  /** O que esse documento comprova, em uma frase. */
  comprova: string;
  /** Por que o original não aparece, ou por que não é documento oficial. */
  nota?: string;
  /** Rota interna, para os cards que leem dado ao vivo. */
  destino?: string;
}

export type Certificate = CertificadoArquivo | RegistroComprovacao;

/** Ordem em que as seções aparecem na página. */
export const ORDEM_SECOES: string[] = [
  "Formação e trajetória",
  "Produção pública",
  "DIO — Bootcamp Spread Fullstack",
  "Alura — Programa ONE",
  "Rocketseat Discover",
  "DIO — Bootcamp Santander",
  "ABC — Programa GRC1",
  "Cursos",
  "Eventos",
];

/** Rótulo curto que aparece na etiqueta do card de registro. */
export const ROTULO_NATUREZA: Record<Natureza, string> = {
  oficial: "documento oficial",
  "nao-oficial": "registro não institucional",
  "ao-vivo": "dado ao vivo",
};

// Fim do modelo.