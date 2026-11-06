/**
 * Liberação do currículo com e sem localStorage.
 *
 * Achado 10 da revisão de 27/10/2026: com cookies bloqueados, a liberação não
 * era gravada e o formulário voltava depois do recarregamento, num laço.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// useResumeAccess não usa hooks do React; o alias evita o falso alerta do lint
const carregar = async () => {
  vi.resetModules()
  const { useResumeAccess: criarAcesso } = await import('@/entities/resume/model/useResumeAccess')
  return criarAcesso()
}

describe('acesso ao currículo', () => {
  let dados: Record<string, string>

  beforeEach(() => {
    dados = {}
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('começa bloqueado e libera depois do formulário, gravando no navegador', async () => {
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => dados[k] ?? null,
      setItem: (k: string, v: string) => { dados[k] = v },
    })
    const acesso = await carregar()
    expect(acesso.isAuthorized()).toBe(false)
    acesso.grantAccess('Ada', 'Empresa')
    expect(acesso.isAuthorized()).toBe(true)
    expect(dados.curriculum_authorized).toBe('true')
  })

  it('libera na mesma aba mesmo quando o localStorage lança exceção', async () => {
    const falha = () => { throw new Error('SecurityError') }
    vi.stubGlobal('localStorage', { getItem: falha, setItem: falha })
    const acesso = await carregar()
    expect(acesso.isAuthorized()).toBe(false)
    expect(() => acesso.grantAccess('Ada', 'Empresa')).not.toThrow()
    expect(acesso.isAuthorized()).toBe(true)
  })

  it('o formulário não recarrega a página depois de liberar', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const modal = readFileSync(
      fileURLToPath(new URL('../entities/resume/ui/CurriculumAccessModal.tsx', import.meta.url)),
      'utf8',
    )
    expect(modal).not.toMatch(/location\.reload\(/)
  })
})
