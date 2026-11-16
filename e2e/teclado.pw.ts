import { expect, test } from '@playwright/test'

/**
 * Critério 8, parte do teclado: só Tab, Enter e Esc, sem `.focus()` nem cliques.
 */

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/**', (r) => r.fulfill({ status: 404, json: {} }))
  await page.route('https://api.rss2json.com/**', (r) => r.fulfill({ json: { status: 'ok', items: [] } }))
})

test('o foco do teclado tem o contorno no acento do tema', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')
  await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' })
  await page.keyboard.press('Tab')
  const foco = page.locator(':focus')
  await expect(foco).toHaveCount(1)
  const estilo = await foco.evaluate((el) => {
    const s = getComputedStyle(el)
    const acento = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
    // Converte o hexadecimal do token para o formato rgb() do getComputedStyle.
    const n = parseInt(acento.slice(1), 16)
    return { largura: s.outlineWidth, estiloLinha: s.outlineStyle, cor: s.outlineColor, acento: `rgb(${n >> 16}, ${(n >> 8) & 255}, ${n & 255})` }
  })
  expect(estilo.estiloLinha).toBe('solid')
  expect(estilo.largura).toBe('2px')
  expect(estilo.cor).toBe(estilo.acento)
})

test.describe('menu do celular', () => {
  test.use({ viewport: { width: 375, height: 800 } })

  test('fechado, os links do menu não recebem foco', async ({ page }) => {
    await page.goto('/')
    const abrir = page.getByRole('button', { name: 'Abrir menu' })
    await expect(abrir).toHaveAttribute('aria-expanded', 'false')
    // Dez Tabs passam pelo cabeçalho e pelo conteúdo; nenhum cai no menu escondido.
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const dentroDoMenu = await page.evaluate(() => !!document.activeElement?.closest('#menu-principal'))
      expect(dentroDoMenu, `Tab ${i + 1}`).toBe(false)
    }
  })

  test('abre com Enter, leva o foco para dentro e fecha com Esc, devolvendo o foco', async ({ page }) => {
    await page.goto('/')
    const abrir = page.getByRole('button', { name: 'Abrir menu' })
    // O botão de abrir é o primeiro elemento focável da página no celular.
    await page.keyboard.press('Tab')
    await expect(abrir).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(abrir).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('navigation', { name: 'Menu principal' }).getByRole('link', { name: 'Home' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(abrir).toHaveAttribute('aria-expanded', 'false')
    await expect(abrir).toBeFocused()
  })
})
