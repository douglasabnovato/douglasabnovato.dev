import { expect, test } from '@playwright/test'

/**
 * Critério 8, parte do teclado: só Tab, Enter e Esc, sem `.focus()` nem cliques.
 */

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/**', (r) => r.fulfill({ status: 404, json: {} }))
  await page.route('https://api.rss2json.com/**', (r) => r.fulfill({ json: { status: 'ok', items: [] } }))
})

for (const tema of ['dark', 'light'] as const) {
  test(`o foco do teclado tem o contorno no acento do tema ${tema === 'dark' ? 'escuro' : 'claro'}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.addInitScript((t) => {
      try {
        localStorage.setItem('theme', t)
      } catch {
        /* sem armazenamento */
      }
    }, tema)
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', tema)
    await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' })
    await page.keyboard.press('Tab')
    const foco = page.locator(':focus')
    await expect(foco).toHaveCount(1)
    const estilo = await foco.evaluate((el) => {
      const s = getComputedStyle(el)
      // O navegador resolve o token do acento em rgb(), em qualquer formato que ele tenha no CSS.
      const amostra = document.createElement('span')
      amostra.style.color = 'var(--color-accent)'
      document.body.appendChild(amostra)
      const acento = getComputedStyle(amostra).color
      amostra.remove()
      return { largura: s.outlineWidth, estiloLinha: s.outlineStyle, cor: s.outlineColor, acento }
    })
    expect(estilo.estiloLinha).toBe('solid')
    expect(estilo.largura).toBe('2px')
    expect(estilo.cor).toBe(estilo.acento)
  })
}

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

  test('ao fechar, o menu desliza antes de sair da tela e do Tab', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Abrir menu' }).click()
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeFocused()
    await page.keyboard.press('Escape')
    const menu = page.locator('#menu-principal')
    // Logo depois do Esc, ainda visível (animação de saída); depois dos 200 ms, escondido.
    expect(await menu.evaluate((el) => getComputedStyle(el).visibility)).toBe('visible')
    await expect.poll(() => menu.evaluate((el) => getComputedStyle(el).visibility)).toBe('hidden')
  })

  test('escolher um link fecha o menu sem levar o foco de volta ao cabeçalho', async ({ page }) => {
    await page.route('https://api.rss2json.com/**', (r) => r.fulfill({ json: { status: 'ok', items: [] } }))
    await page.goto('/')
    const abrir = page.getByRole('button', { name: 'Abrir menu' })
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeFocused()
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('navigation', { name: 'Menu principal' }).getByRole('link', { name: 'Blog' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/blog$/)
    await expect(abrir).toHaveAttribute('aria-expanded', 'false')
    await expect(abrir).not.toBeFocused()
  })

  test('o Tab que sai do menu aberto fecha o menu', async ({ page }) => {
    await page.goto('/')
    const abrir = page.getByRole('button', { name: 'Abrir menu' })
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeFocused()
    // Do "Fechar menu", 6 Tabs passam pelos links e o 7º chega ao botão de tema; o 8º sai do menu.
    for (let i = 0; i < 7; i++) await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: /Modo (claro|escuro)/ })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(abrir).toHaveAttribute('aria-expanded', 'false')
    expect(await page.evaluate(() => !!document.activeElement?.closest('#menu-principal'))).toBe(false)
  })
})
