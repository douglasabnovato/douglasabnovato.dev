import { readFileSync } from 'node:fs'
import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

/**
 * Critério 8: axe em todas as rotas, nos dois temas do site (o tema escuro é
 * real: `data-theme` com tokens próprios em `main.css`), em largura de desktop.
 *
 * - As transições de cor são desligadas antes do axe, para ele não ler uma cor
 *   no meio da troca de tema.
 * - O axe não decide contraste sobre fundo translúcido ou gradiente e devolve
 *   esses casos em `incomplete`. O teste falha também com eles, para ninguém
 *   achar que "sem violação" quer dizer "contraste conferido".
 * - A API do GitHub e o feed do Medium respondem com dados reais gravados em
 *   `e2e/fixtures`, para o teste não depender do limite de 60 requisições por hora.
 *   As imagens externas (capas) são cortadas.
 */

// Respostas reais e públicas, gravadas por `node e2e/fixtures/gravar.mjs` (só os campos que o site lê).
const ler = (nome: string) => JSON.parse(readFileSync(new URL(`./fixtures/${nome}`, import.meta.url), 'utf8'))
const repos = ler('github-repos.json')
const usuario = ler('github-usuario.json')
const gists = ler('github-gists.json')
const medium = ler('medium.json')

async function simularApis(page: Page) {
  // A rota registrada por último vence: a genérica vem antes.
  await page.route('https://api.github.com/**', (r) => r.fulfill({ status: 404, json: {} }))
  await page.route('https://api.github.com/users/douglasabnovato', (r) => r.fulfill({ json: usuario }))
  await page.route('https://api.github.com/users/douglasabnovato/repos**', (r) => r.fulfill({ json: repos }))
  await page.route('https://api.github.com/users/douglasabnovato/gists**', (r) => r.fulfill({ json: gists }))
  await page.route('https://api.rss2json.com/**', (r) => r.fulfill({ json: medium }))
  await page.route('https://opengraph.githubassets.com/**', (r) => r.abort())
  await page.route('https://cdn-images-1.medium.com/**', (r) => r.abort())
  await page.route('https://miro.medium.com/**', (r) => r.abort())
}

// O currículo entra duas vezes: com o formulário de identificação e liberado.
const casos = [
  { rota: '/', liberado: false },
  { rota: '/projetos', liberado: false },
  { rota: '/blog', liberado: false },
  { rota: '/curriculo', liberado: false },
  { rota: '/curriculo', liberado: true },
  { rota: '/certificados', liberado: false },
  { rota: '/curadoria', liberado: false },
  { rota: '/ideias', liberado: false },
  { rota: '/curadoria/canais-de-web-design', liberado: false },
  { rota: '/rota-que-nao-existe', liberado: false },
]
const temas = ['dark', 'light'] as const

for (const tema of temas) {
  for (const { rota, liberado } of casos) {
    const nome = `${rota}${liberado ? ' (liberado)' : ''}`
    test(`axe sem violações em ${nome} no tema ${tema === 'dark' ? 'escuro' : 'claro'}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 })
      await simularApis(page)
      await page.addInitScript(
        ({ t, l }) => {
          try {
            localStorage.setItem('theme', t)
            // Mesma chave do useResumeAccess: libera o currículo sem o formulário.
            if (l) localStorage.setItem('curriculum_authorized', 'true')
          } catch {
            /* sem armazenamento: segue com o tema padrão */
          }
        },
        { t: tema, l: liberado },
      )
      await page.goto(rota)
      await expect(page.locator('html')).toHaveAttribute('data-theme', tema)
      await page.waitForLoadState('networkidle')
      await expect(page.getByRole('status').filter({ hasText: 'Carregando…' })).toHaveCount(0)
      await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; animation: none !important; }' })

      const resultado = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()

      const violacoes = resultado.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)
      expect(violacoes, `violações em ${nome} (${tema})`).toEqual([])

      const contrasteIndeciso = resultado.incomplete
        .filter((v) => v.id === 'color-contrast')
        .flatMap((v) => v.nodes.map((n) => `${n.target.join(' ')}: ${n.any.map((a) => a.message).join(' ')}`))
      expect(contrasteIndeciso, `contraste que o axe não conseguiu medir em ${nome} (${tema})`).toEqual([])
    })
  }
}

for (const tema of temas) {
  test(`axe sem violações com o menu do celular aberto no tema ${tema === 'dark' ? 'escuro' : 'claro'}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await simularApis(page)
    await page.addInitScript((t) => {
      try {
        localStorage.setItem('theme', t)
      } catch {
        /* sem armazenamento */
      }
    }, tema)
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', tema)
    await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; animation: none !important; }' })
    await page.getByRole('button', { name: 'Abrir menu' }).click()
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeFocused()

    const resultado = await new AxeBuilder({ page }).include('#menu-principal').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(resultado.violations.map((v) => v.id)).toEqual([])
    expect(resultado.incomplete.filter((v) => v.id === 'color-contrast').flatMap((v) => v.nodes.map((n) => n.target.join(' ')))).toEqual([])
  })
}
