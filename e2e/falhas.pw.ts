import { expect, test } from '@playwright/test'

/**
 * Critério 6: erro e lista vazia têm resposta na tela, em Projetos e no Blog.
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
