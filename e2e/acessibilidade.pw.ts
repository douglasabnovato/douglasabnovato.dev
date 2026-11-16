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
 * - A API do GitHub e o feed do Medium são simulados com dados no formato real,
 *   para o teste não depender do limite de 60 requisições por hora.
 */

const repo = (id: number, name: string, extra: Record<string, unknown> = {}) => ({
  id,
  name,
  full_name: `douglasabnovato/${name}`,
  description: `Descrição do projeto ${name}`,
  html_url: `https://github.com/douglasabnovato/${name}`,
  homepage: '',
  language: 'TypeScript',
  stargazers_count: id,
  forks_count: 0,
  open_issues_count: id % 3,
  updated_at: '2026-11-01T00:00:00Z',
  created_at: '2025-01-01T00:00:00Z',
  pushed_at: '2026-11-01T00:00:00Z',
  topics: [] as string[],
  fork: false,
  archived: false,
  ...extra,
})

const repos = [
  repo(1, 'projeto-especial', { topics: ['especial', 'react'], homepage: 'https://especial.example.com' }),
  repo(2, 'projeto-destaque', { topics: ['destaque', 'vite'], homepage: 'https://destaque.example.com' }),
  repo(3, 'projeto-mvp', { topics: ['mvp'], language: 'JavaScript' }),
  repo(4, 'projeto-curso', { topics: ['curso'], language: 'Python' }),
  repo(5, 'projeto-comum'),
  repo(6, 'projeto-fork', { fork: true }),
  repo(7, 'projeto-arquivado', { archived: true, language: null }),
]

const usuario = { login: 'douglasabnovato', public_repos: 7, public_gists: 2, followers: 10, following: 5 }
const gists = [
  {
    id: 'g1',
    html_url: 'https://gist.github.com/douglasabnovato/g1',
    description: 'Gist de exemplo',
    files: { 'exemplo.ts': { filename: 'exemplo.ts', language: 'TypeScript' } },
    created_at: '2026-10-01T00:00:00Z',
    updated_at: '2026-10-01T00:00:00Z',
    public: true,
  },
]
const medium = {
  status: 'ok',
  items: [
    {
      title: 'Artigo de exemplo',
      pubDate: '2026-10-20 12:00:00',
      link: 'https://douglasabnovato.medium.com/artigo-de-exemplo',
      guid: 'https://medium.com/p/exemplo',
      author: 'douglasabnovato',
      thumbnail: '',
      description: '<p>Resumo do artigo de exemplo.</p>',
      content: '<p>Resumo do artigo de exemplo.</p>',
      categories: ['react'],
    },
  ],
}

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
