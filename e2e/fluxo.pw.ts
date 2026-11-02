import { expect, test } from '@playwright/test'

test('a página inicial abre mesmo sem a API do GitHub', async ({ page }) => {
  const erros: string[] = []
  page.on('pageerror', (e) => erros.push(e.message))
  await page.route('https://api.github.com/**', (r) => r.abort())
  await page.goto('/')
  await expect(page.locator('h1').first()).toBeVisible()
  expect(erros).toEqual([])
})

test('a imagem de destaque não usa carregamento tardio', async ({ page }) => {
  await page.goto('/')
  const destaque = page.locator('main img[fetchpriority="high"]')
  await expect(destaque).toHaveCount(1)
  await expect(destaque).not.toHaveAttribute('loading', 'lazy')
})

for (const rota of ['/curadoria', '/ideias']) {
  test(`o filtro de ${rota} funciona pelo teclado`, async ({ page }) => {
    await page.goto(rota)
    const grupo = page.getByRole('group', { name: 'Filtrar por tema' })
    const tema = grupo.getByRole('button').nth(1)
    await tema.focus()
    await page.keyboard.press('Enter')
    await expect(tema).toHaveAttribute('aria-pressed', 'true')
    await expect(grupo.getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'false')
  })
}

test('uma rota inexistente mostra a página de erro e não uma tela vazia', async ({ page }) => {
  await page.goto('/rota-que-nao-existe')
  await expect(page.locator('main, #root').first()).not.toBeEmpty()
  await expect(page.getByRole('link').first()).toBeVisible()
})

test('em 375 px não há rolagem horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  for (const rota of ['/', '/curadoria', '/ideias']) {
    await page.goto(rota)
    await page.waitForLoadState('networkidle')
    expect(await page.evaluate(() => document.documentElement.scrollWidth), rota).toBeLessThanOrEqual(375)
  }
})
