import { expect, test } from '@playwright/test'

/**
 * Fluxo principal (critério 3): da página inicial até um projeto no ar,
 * em até 3 cliques. A API do GitHub é simulada para o teste não depender
 * do limite de 60 requisições por hora.
 */
const repos = [
  {
    id: 1,
    name: 'projeto-exemplo',
    description: 'Projeto de exemplo para o teste',
    html_url: 'https://github.com/douglasabnovato/projeto-exemplo',
    homepage: 'https://projeto-exemplo.example.com',
    language: 'TypeScript',
    stargazers_count: 0,
    open_issues_count: 0,
    updated_at: '2026-11-01T00:00:00Z',
    created_at: '2025-01-01T00:00:00Z',
    pushed_at: '2026-11-01T00:00:00Z',
    topics: ['destaque'],
    fork: false,
    archived: false,
  },
]

test.beforeEach(async ({ page }) => {
  // A rota registrada por último vence: a genérica vem antes.
  await page.route('https://api.github.com/**', (r) => r.fulfill({ status: 404, json: {} }))
  await page.route('https://api.github.com/users/douglasabnovato/repos**', (r) =>
    r.fulfill({ json: repos }),
  )
  await page.route('https://opengraph.githubassets.com/**', (r) => r.abort())
})

test('da página inicial a um projeto no ar em até 3 cliques', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Projetos' }).first().click()
  await expect(page).toHaveURL(/\/projetos$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Repositórios')

  const noAr = page.getByRole('link', { name: 'No ar' }).and(page.locator('[href*="projeto-exemplo"]'))
  await expect(noAr).toHaveAttribute('href', 'https://projeto-exemplo.example.com')
  await expect(noAr).toHaveAttribute('target', '_blank')
  await expect(noAr).toHaveAttribute('data-evento', 'abriu-projeto')

  await page.context().route('https://projeto-exemplo.example.com/**', (r) =>
    r.fulfill({ contentType: 'text/html', body: '<title>Projeto no ar</title>' }),
  )
  const [aba] = await Promise.all([page.context().waitForEvent('page'), noAr.click()])
  await expect(aba).toHaveTitle('Projeto no ar')
})

test('o GoatCounter não carrega no teste nem em localhost', async ({ page }) => {
  const pedidos: string[] = []
  page.on('request', (r) => pedidos.push(r.url()))
  await page.goto('/')
  await page.getByRole('link', { name: 'Projetos' }).first().click()
  await expect(page).toHaveURL(/\/projetos$/)
  await expect(page.locator('script[data-goatcounter]')).toHaveCount(0)
  expect(pedidos.filter((u) => u.includes('goatcounter') || u.includes('gc.zgo.at'))).toEqual([])
})
