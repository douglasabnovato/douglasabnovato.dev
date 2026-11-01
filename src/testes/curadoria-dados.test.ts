/** Integridade da curadoria: cada issue aparece uma vez, com status coerente e sem dado privado. */

import { describe, expect, it } from 'vitest'

import { canaisDesign, curadoria, ideias, ISSUE_CANAIS } from '@/entities/curadoria/model/curadoria.data'

const todos = [...curadoria, ...ideias]
/** Issues com contatos ou links privados: não entram em página pública. */
const FORA_DA_PAGINA = [159, 162, 169]

describe('curadoria', () => {
  it('não repete issue', () => {
    const numeros = [...todos.map((i) => i.issue), ISSUE_CANAIS]
    expect(new Set(numeros).size).toBe(numeros.length)
  })

  it('cobre todas as issues previstas', () => {
    expect(curadoria).toHaveLength(55)
    expect(ideias).toHaveLength(26)
  })

  it('deixa de fora as issues com dados privados', () => {
    FORA_DA_PAGINA.forEach((n) => expect(todos.some((i) => i.issue === n)).toBe(false))
  })

  it('não diz que ideia é outra coisa', () => {
    ideias.forEach((i) => expect(i.status).toBe('ideia'))
    curadoria.forEach((i) => expect(i.status).not.toBe('ideia'))
  })

  it('só usa links https e tem resumo', () => {
    todos.forEach((i) => {
      expect(i.resumo.length).toBeGreaterThan(0)
      if (i.link) expect(i.link.startsWith('https://')).toBe(true)
    })
    canaisDesign.forEach((c) => expect(c.url.startsWith('https://www.youtube.com/@')).toBe(true))
  })
})
