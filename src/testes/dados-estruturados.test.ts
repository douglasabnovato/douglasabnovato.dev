/**
 * Dados estruturados do index.html (schema.org ProfilePage + Person).
 *
 * Garante que o JSON-LD é válido, aponta para o endereço canônico e que o
 * sameAs bate com os canais https ativos de channels.ts. WhatsApp e e-mail
 * ficam fora, para não expor telefone nem endereço em dado estruturado.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { channels } from '@/shared/config/channels'

const html = readFileSync(fileURLToPath(new URL('../../index.html', import.meta.url)), 'utf8')
const blocos = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]

describe('dados estruturados', () => {
  it('tem um bloco JSON-LD válido do tipo ProfilePage', () => {
    expect(blocos).toHaveLength(1)
    const dado = JSON.parse(blocos[0][1])
    expect(dado['@context']).toBe('https://schema.org')
    expect(dado['@type']).toBe('ProfilePage')
    expect(dado.url).toBe(canonical)
  })

  it('descreve a pessoa com nome, cargo e endereço canônico', () => {
    const pessoa = JSON.parse(blocos[0][1]).mainEntity
    expect(pessoa['@type']).toBe('Person')
    expect(pessoa.name).toBeTruthy()
    expect(pessoa.jobTitle).toBeTruthy()
    expect(pessoa.url).toBe(canonical)
  })

  it('sameAs bate com os canais https ativos e não tem telefone nem e-mail', () => {
    const { sameAs } = JSON.parse(blocos[0][1]).mainEntity as { sameAs: string[] }
    const esperados = channels
      .filter((c) => c.active && c.url.startsWith('https://') && !c.url.startsWith('https://wa.me'))
      .map((c) => c.url)
    expect(sameAs).toEqual(esperados)
    for (const url of sameAs) expect(url).not.toMatch(/wa\.me|mailto:|@gmail/)
  })
})
