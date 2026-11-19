import { expect, test, type Locator, type Page } from '@playwright/test'

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
    // Espera o React desenhar o menu lateral antes do primeiro Tab.
    await expect(page.getByRole('navigation', { name: 'Menu principal' })).toBeVisible()
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

test.describe('pular para o conteúdo', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  for (const rota of ['/', '/projetos', '/blog']) {
    test(`em ${rota}, o 1º Tab mostra o link, e o Enter leva o foco ao conteúdo`, async ({ page }) => {
      await page.goto(rota)
      const menu = page.getByRole('navigation', { name: 'Menu principal' })
      await expect(menu).toBeVisible()
      // As páginas internas carregam sob demanda: espera o título da página.
      await expect(page.locator('main#conteudo h1').first()).toBeVisible()
      const pular = page.getByRole('link', { name: 'Pular para o conteúdo' })
      // Sem foco, o link fica fora da tela.
      expect((await pular.boundingBox())?.y ?? 0).toBeLessThan(0)

      await page.keyboard.press('Tab')
      await expect(pular).toBeFocused()
      await expect(pular).toBeInViewport()

      await page.keyboard.press('Enter')
      const conteudo = page.locator('main#conteudo')
      await expect(conteudo).toBeFocused()
      await expect(page).toHaveURL(new RegExp(`${rota === '/' ? '/' : rota}$`))
      // O Tab seguinte já anda dentro do conteúdo, sem passar pelos 7 itens do menu lateral.
      await page.keyboard.press('Tab')
      expect(await page.evaluate(() => !!document.activeElement?.closest('main#conteudo'))).toBe(true)
    })
  }
})

test.describe('menu do celular', () => {
  test.use({ viewport: { width: 375, height: 800 } })

  /**
   * Abre a Home e espera o React desenhar o cabeçalho. Um Tab dado antes disso
   * não cai no "Abrir menu", e o Enter seguinte não abre nada (#280).
   */
  const abrirHome = async (page: Page) => {
    await page.goto('/')
    const abrir = page.getByRole('button', { name: 'Abrir menu' })
    await expect(abrir).toBeVisible()
    await expect(abrir).toHaveAttribute('aria-expanded', 'false')
    return abrir
  }

  /** Abre o menu só com Tab e Enter, e espera o estado "aberto" antes de seguir. */
  const abrirMenuPeloTeclado = async (page: Page, abrir: Locator) => {
    // No celular, o 1º Tab cai no "Pular para o conteúdo" e o 2º no botão de abrir.
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(abrir).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(abrir).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#menu-principal')).toHaveAttribute('data-aberto', 'true')
    const fechar = page.getByRole('button', { name: 'Fechar menu' })
    await expect(fechar).toBeFocused()
    return fechar
  }

  const menuTemFoco = (page: Page) => page.evaluate(() => !!document.activeElement?.closest('#menu-principal'))

  test('fechado, os links do menu não recebem foco', async ({ page }) => {
    await abrirHome(page)
    // Dez Tabs passam pelo cabeçalho e pelo conteúdo; nenhum cai no menu escondido.
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      expect(await menuTemFoco(page), `Tab ${i + 1}`).toBe(false)
    }
  })

  test('abre com Enter, leva o foco para dentro e fecha com Esc, devolvendo o foco', async ({ page }) => {
    const abrir = await abrirHome(page)
    await abrirMenuPeloTeclado(page, abrir)
    await page.keyboard.press('Tab')
    await expect(page.getByRole('navigation', { name: 'Menu principal' }).getByRole('link', { name: 'Home' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(abrir).toHaveAttribute('aria-expanded', 'false')
    await expect(abrir).toBeFocused()
  })

  test('ao fechar, o menu desliza antes de sair da tela e do Tab', async ({ page }) => {
    const abrir = await abrirHome(page)
    await abrirMenuPeloTeclado(page, abrir)
    const menu = page.locator('#menu-principal')
    await page.keyboard.press('Escape')
    await expect(menu).not.toHaveAttribute('data-aberto')
    // Fechado, o `visibility` só muda depois do deslize: a transição dele tem o atraso do `transform`.
    const transicao = await menu.evaluate((el) => {
      const s = getComputedStyle(el)
      const propriedades = s.transitionProperty.split(',').map((p) => p.trim())
      const atrasos = s.transitionDelay.split(',').map((d) => d.trim())
      const duracoes = s.transitionDuration.split(',').map((d) => d.trim())
      return {
        atrasoVisibilidade: atrasos[propriedades.indexOf('visibility')],
        duracaoDeslize: duracoes[propriedades.indexOf('transform')],
      }
    })
    expect(transicao.duracaoDeslize).toBe('0.2s')
    expect(transicao.atrasoVisibilidade).toBe(transicao.duracaoDeslize)
    await expect.poll(() => menu.evaluate((el) => getComputedStyle(el).visibility)).toBe('hidden')
  })

  test('escolher um link fecha o menu sem levar o foco de volta ao cabeçalho', async ({ page }) => {
    const abrir = await abrirHome(page)
    await abrirMenuPeloTeclado(page, abrir)
    const blog = page.getByRole('navigation', { name: 'Menu principal' }).getByRole('link', { name: 'Blog' })
    // Do "Fechar menu", o Tab passa por Home e Projetos até chegar ao Blog.
    for (let i = 0; i < 10 && !(await blog.evaluate((el) => el === document.activeElement)); i++) {
      await page.keyboard.press('Tab')
    }
    await expect(blog).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/blog$/)
    await expect(abrir).toHaveAttribute('aria-expanded', 'false')
    await expect(abrir).not.toBeFocused()
  })

  test('o Tab que sai do menu aberto fecha o menu', async ({ page }) => {
    const abrir = await abrirHome(page)
    await abrirMenuPeloTeclado(page, abrir)
    // Avança o Tab até o botão de tema, o último do menu, sem contar quantos links há antes.
    const tema = page.getByRole('button', { name: /Modo (claro|escuro)/ })
    for (let i = 0; i < 15 && !(await tema.evaluate((el) => el === document.activeElement)); i++) {
      await page.keyboard.press('Tab')
      expect(await menuTemFoco(page), `Tab ${i + 1} ainda dentro do menu`).toBe(true)
    }
    await expect(tema).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(abrir).toHaveAttribute('aria-expanded', 'false')
    expect(await menuTemFoco(page)).toBe(false)
  })
})
