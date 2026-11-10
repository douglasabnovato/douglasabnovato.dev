/**
 * Medição de uso (decisão D5): o GoatCounter só carrega no site publicado.
 */
import { describe, expect, it } from 'vitest'
import { deveMedir, GOATCOUNTER_URL, iniciarMedicao } from '@/shared/lib/medicao'

const publicado = { producao: true, hostname: 'douglasabnovato-dev.vercel.app', automatizado: false }

describe('medição com GoatCounter', () => {
  it('aponta para o código único do portfólio', () => {
    expect(GOATCOUNTER_URL).toBe('https://douglasabnovato.goatcounter.com/count')
  })

  it('mede só no build de produção, fora de localhost e fora de teste automatizado', () => {
    expect(deveMedir(publicado)).toBe(true)
    expect(deveMedir({ ...publicado, producao: false })).toBe(false)
    expect(deveMedir({ ...publicado, automatizado: true })).toBe(false)
    expect(deveMedir({ ...publicado, hostname: 'localhost' })).toBe(false)
    expect(deveMedir({ ...publicado, hostname: '127.0.0.1' })).toBe(false)
  })

  it('não carrega o script durante os testes', () => {
    expect(iniciarMedicao()).toBe(false)
  })
})
