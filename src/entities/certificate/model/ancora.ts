/**
 * Resolve a âncora de um registro de comprovação contra o resume.data.ts.
 *
 * É o que impede duplicação: o registro guarda só a camada de comprovação,
 * e organização, cargo, período e contexto vêm do currículo.
 */

import { resumeData } from "@/entities/resume/model/resume.data";

export interface DadosAncora {
  titulo: string;
  subtitulo?: string;
  periodo?: string;
  texto?: string;
  itens?: string[];
}

/** Procura o id nas experiências, na comunidade e na formação, nessa ordem. */
export function resolverAncora(id: string): DadosAncora | null {
  const exp = resumeData.experiences.find((e) => e.id === id);
  if (exp) {
    return {
      titulo: exp.company,
      subtitulo: exp.role,
      periodo: exp.period,
      texto: exp.context,
      itens: exp.deliverables,
    };
  }

  const com = resumeData.community.find((c) => c.id === id);
  if (com) {
    return {
      titulo: com.title,
      subtitulo: com.role,
      periodo: com.period,
      texto: com.detail,
    };
  }

  const edu = resumeData.education.find((e) => e.id === id);
  if (edu) {
    return {
      titulo: edu.institution,
      subtitulo: edu.degree,
      periodo: edu.period,
      texto: edu.note,
    };
  }

  const pub = resumeData.publications.find((p) => p.id === id);
  if (pub) {
    return { titulo: pub.title, periodo: pub.period, texto: pub.detail };
  }

  return null;
}

// Fim do resolvedor de âncoras.