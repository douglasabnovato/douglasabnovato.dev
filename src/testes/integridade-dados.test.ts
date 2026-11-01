/**
 * Integridade dos dados mantidos à mão: certificados, currículo e acervo do Blog.
 *
 * Nenhum teste aqui avalia conteúdo. Eles só garantem que os arquivos de dado
 * continuam consistentes entre si — id único, seção conhecida, data válida,
 * arquivo publicado existente, âncora com destino, rótulo de período batendo
 * com a data e totais do Blog fechando com o total declarado.
 */

import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { blogMeta } from '@/entities/article/api/blog.data'
import { resolverAncora } from '@/entities/certificate/model/ancora'
import { certificates } from '@/entities/certificate/model/certificates.data'
import {
  ORDEM_SECOES,
  type Certificate,
  type CertificadoArquivo,
  type RegistroComprovacao,
} from '@/entities/certificate/model/types'
import { resumeData } from '@/entities/resume/model/resume.data'

const PASTA_ARQUIVOS = fileURLToPath(new URL('../../public/arquivos/', import.meta.url))
const DATA_CERTIFICADO = /^\d{4}(-\d{2}(-\d{2})?)?$/
const MES_ANO = /^\d{4}-(0[1-9]|1[0-2])$/
const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/**
 * Âncoras sem destino conhecidas, registradas no relatório de 26/10/2026.
 * Os cards caem no campo `organizacao` e continuam aparecendo, mas perdem
 * período e contexto vindos do currículo. Ao corrigir, remova a linha daqui.
 */
const ANCORAS_PENDENTES: Record<string, string> = {
  'reg-ifsudestemg': 'ifsudestemg',
  'reg-ufjf': 'ufjf',
}

const temArquivo = (c: Certificate): c is CertificadoArquivo => c.evidencia === 'arquivo'
const temAncora = (c: Certificate): c is RegistroComprovacao => c.evidencia !== 'arquivo'

/** Devolve os valores repetidos de uma lista. */
const repetidos = (valores: string[]) => valores.filter((v, i) => valores.indexOf(v) !== i)

/** "2026-10" → "out/2026". */
const rotuloMesAno = (iso: string) => {
  const [ano, mes] = iso.split('-')
  return `${MESES[Number(mes) - 1]}/${ano}`
}

describe('certificados', () => {
  it('têm id único', () => {
    expect(repetidos(certificates.map((c) => c.id))).toEqual([])
  })

  it('pertencem a uma seção de ORDEM_SECOES', () => {
    const fora = certificates.filter((c) => !ORDEM_SECOES.includes(c.secao)).map((c) => c.id)
    expect(fora).toEqual([])
  })

  it('têm data em AAAA, AAAA-MM ou AAAA-MM-DD', () => {
    const invalidas = certificates.filter((c) => !DATA_CERTIFICADO.test(c.data)).map((c) => c.id)
    expect(invalidas).toEqual([])
  })

  it('apontam para um arquivo existente em public/arquivos', () => {
    const ausentes = certificates
      .filter(temArquivo)
      .filter((c) => !existsSync(PASTA_ARQUIVOS + c.arquivo))
      .map((c) => c.id)
    expect(ausentes).toEqual([])
  })

  it('têm âncora com destino no currículo, fora as pendências registradas', () => {
    const semDestino = certificates
      .filter(temAncora)
      .filter((c) => !(c.id in ANCORAS_PENDENTES))
      .filter((c) => resolverAncora(c.ancora) === null)
      .map((c) => `${c.id} → ${c.ancora}`)
    expect(semDestino).toEqual([])
  })

  it('mantêm a lista de pendências fiel: cada uma ainda está sem destino', () => {
    const corrigidas = Object.entries(ANCORAS_PENDENTES)
      .filter(([, ancora]) => resolverAncora(ancora) !== null)
      .map(([id]) => id)
    expect(corrigidas, 'Âncora corrigida: remova-a de ANCORAS_PENDENTES').toEqual([])
  })
})

describe('currículo', () => {
  const { experiences, education, community, publications } = resumeData

  it('tem id único em cada lista', () => {
    expect(repetidos(experiences.map((e) => e.id))).toEqual([])
    expect(repetidos(education.map((e) => e.id))).toEqual([])
    expect(repetidos(community.map((e) => e.id))).toEqual([])
    expect(repetidos(publications.map((e) => e.id))).toEqual([])
  })

  it('tem início e fim em AAAA-MM, com o fim depois do início', () => {
    const invalidas = experiences
      .filter(
        (e) =>
          (e.start !== undefined && !MES_ANO.test(e.start)) ||
          (typeof e.end === 'string' && !MES_ANO.test(e.end)) ||
          (e.start !== undefined && typeof e.end === 'string' && e.end < e.start),
      )
      .map((e) => e.id)
    expect(invalidas).toEqual([])
  })

  it('usa "presente" exatamente nas experiências sem data de fim', () => {
    const divergentes = experiences
      .filter((e) => (e.end === null) !== e.period.includes('presente'))
      .map((e) => e.id)
    expect(divergentes).toEqual([])
  })

  it('tem o rótulo do período começando pelo mês de início', () => {
    const divergentes = experiences
      .filter((e) => e.start !== undefined && !e.period.startsWith(rotuloMesAno(e.start)))
      .map((e) => `${e.id}: "${e.period}" × ${e.start}`)
    expect(divergentes).toEqual([])
  })
})

describe('acervo do Blog', () => {
  const soma = (valores: number[]) => valores.reduce((total, v) => total + v, 0)

  it('tem a série por ano somando o total de artigos', () => {
    expect(soma(blogMeta.yearly.map((y) => y.count))).toBe(blogMeta.mediumTotal)
  })

  it('tem os grupos temáticos somando o total de artigos', () => {
    expect(soma(blogMeta.topics.map((t) => t.count))).toBe(blogMeta.mediumTotal)
  })

  it('tem as linhas editoriais ativas somando o total de artigos', () => {
    const ativas = blogMeta.editorial.filter((e) => e.active).map((e) => e.count ?? 0)
    expect(soma(ativas)).toBe(blogMeta.mediumTotal)
  })

  it('tem um ponto por ano, sem lacuna, do primeiro ao último ano', () => {
    const anos = blogMeta.yearly.map((y) => y.year)
    const esperado = Array.from(
      { length: blogMeta.mediumUntil - blogMeta.mediumSince + 1 },
      (_, i) => blogMeta.mediumSince + i,
    )
    expect(anos).toEqual(esperado)
  })
})

// Fim dos testes de integridade.
