import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

/**
 * Critério 6: espera, erro e lista vazia têm resposta na tela, em Projetos e no Blog.
 * O cache do localStorage fica vazio em cada teste (contexto novo).
 */

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/**', (r) => r.fulfill({ status: 404, json: {} }))
  await page.route('https://opengraph.githubassets.com/**', (r) => r.abort())
})

test('Projetos avisa quando a API do GitHub recusa', async ({ page }) => {
  await page.route('https://api.github.com/users/douglasabnovato/repos**', (r) =>
    r.fulfill({ status: 403, json: { message: 'API rate limit exceeded' } }),
  )
  await page.goto('/projetos')
  await expect(page.getByText('Limite de requisições da API do GitHub atingido')).toBeVisible()
})

test('Projetos avisa quando a lista de repositórios vem vazia', async ({ page }) => {
  await page.route('https://api.github.com/users/douglasabnovato/repos**', (r) => r.fulfill({ json: [] }))
  await page.goto('/projetos')
  await expect(page.getByText('Nenhum repositório público encontrado agora')).toBeVisible()
  await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute('href', 'https://github.com/douglasabnovato')
})

test('Blog avisa quando o feed do Medium falha', async ({ page }) => {
  await page.route('https://api.rss2json.com/**', (r) => r.abort())
  await page.goto('/blog')
  await expect(page.getByText('Não foi possível ler o feed do Medium agora')).toBeVisible()
})

test('Blog avisa quando o feed vem sem artigos', async ({ page }) => {
  await page.route('https://api.rss2json.com/**', (r) => r.fulfill({ json: { status: 'ok', items: [] } }))
  await page.goto('/blog')
  await expect(page.getByText('O feed não retornou artigos neste momento')).toBeVisible()
})

test('Projetos e Blog mostram a espera enquanto a resposta não chega', async ({ page }) => {
  // Respostas reais e públicas, gravadas por `node e2e/fixtures/gravar.mjs`.
  const repos = JSON.parse(readFileSync(new URL('./fixtures/github-repos.json', import.meta.url), 'utf8'))
  let liberarGithub: () => void = () => {}
  const githubPronto = new Promise<void>((r) => (liberarGithub = r))
  let liberarMedium: () => void = () => {}
  const mediumPronto = new Promise<void>((r) => (liberarMedium = r))
  await page.route('https://api.github.com/users/douglasabnovato/repos**', async (r) => {
    await githubPronto
    await r.fulfill({ json: repos })
  })
  await page.route('https://api.rss2json.com/**', async (r) => {
    await mediumPronto
    await r.fulfill({ json: { status: 'ok', items: [] } })
  })

  await page.goto('/projetos')
  const repositorios = page.getByTestId('indicador-repositorios')
  await expect(repositorios).toHaveText('—')
  await expect(page.getByTestId('indicador-no-ar')).toHaveText('—')
  // A resposta chega: os indicadores trocam o "—" pelo número, e o catálogo aparece.
  liberarGithub()
  await expect(repositorios).toHaveText(/^[1-9]\d*$/)
  await expect(page.getByTestId('indicador-no-ar')).toHaveText(/^\d+$/)
  await expect(page.getByRole('heading', { level: 2 }).filter({ hasText: /Projetos/ })).toBeVisible()
  await expect(page.getByText('Nenhum repositório público encontrado agora')).toHaveCount(0)

  await page.goto('/blog')
  await expect(page.getByText('Carregando artigos…')).toBeVisible()
  liberarMedium()
  await expect(page.getByText('O feed não retornou artigos neste momento')).toBeVisible()
  await expect(page.getByText('Carregando artigos…')).toHaveCount(0)
})
