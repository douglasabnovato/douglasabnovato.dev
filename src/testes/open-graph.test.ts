/**
 * Imagem de prévia (Open Graph) do index.html (#255).
 *
 * Garante que a imagem citada existe em public/, tem 1200 × 630 px e menos de
 * 300 KB, e que as metas apontam para o endereço canônico do site.
 */

import { readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const html = readFileSync(fileURLToPath(new URL('../../index.html', import.meta.url)), 'utf8')
const meta = (atributo: 'property' | 'name', nome: string) =>
  html.match(new RegExp(`<meta\\s+${atributo}="${nome}"\\s+content="([^"]+)"`))?.[1]
const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? ''

describe('imagem de prévia (Open Graph)', () => {
  const imagem = meta('property', 'og:image') ?? ''
  const arquivo = fileURLToPath(new URL(`../../public/${imagem.replace(canonical, '')}`, import.meta.url))

  it('aponta para um arquivo de public/ no endereço canônico', () => {
    expect(canonical).toMatch(/^https:\/\/.+\/$/)
    expect(imagem.startsWith(canonical)).toBe(true)
    expect(statSync(arquivo).isFile()).toBe(true)
  })

  it('é um PNG de 1200 × 630 px com menos de 300 KB, como dizem as metas', () => {
    const dados = readFileSync(arquivo)
    // Assinatura do PNG e o bloco IHDR, com largura e altura em big-endian.
    expect(dados.subarray(1, 4).toString('ascii')).toBe('PNG')
    expect(dados.readUInt32BE(16)).toBe(1200)
    expect(dados.readUInt32BE(20)).toBe(630)
    expect(dados.length).toBeLessThan(300 * 1024)
    expect(meta('property', 'og:image:type')).toBe('image/png')
    expect(meta('property', 'og:image:width')).toBe('1200')
    expect(meta('property', 'og:image:height')).toBe('630')
  })

  it('tem texto alternativo e o cartão grande do X', () => {
    expect(meta('property', 'og:image:alt')?.length ?? 0).toBeGreaterThan(20)
    expect(meta('name', 'twitter:card')).toBe('summary_large_image')
    expect(meta('name', 'twitter:image')).toBe(imagem)
  })
})
