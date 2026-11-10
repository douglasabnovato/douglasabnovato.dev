/**
 * Medição de uso com GoatCounter (decisão D5 de 10/11/2026).
 *
 * - Sem cookie e sem dado pessoal: só o caminho da página e o nome do evento.
 * - Carrega só no build de produção, fora de localhost e fora de navegador
 *   automatizado (Playwright marca `navigator.webdriver`).
 * - Uma conta para o portfólio todo, com o código `douglasabnovato`. Enquanto
 *   a conta não existir, o envio só falha em silêncio no navegador.
 */
export const GOATCOUNTER_URL = 'https://douglasabnovato.goatcounter.com/count'
export const GOATCOUNTER_SCRIPT = 'https://gc.zgo.at/count.js'

/** Evento do fluxo principal: a visita abriu um projeto. */
export const EVENTO_ABRIU_PROJETO = 'abriu-projeto'

interface GoatCounter {
  count: (vars: { path: string; title?: string; event?: boolean }) => void
}

declare global {
  interface Window {
    goatcounter?: GoatCounter
  }
}

interface Ambiente {
  producao: boolean
  hostname: string
  automatizado: boolean
}

function ambienteAtual(): Ambiente {
  return {
    producao: import.meta.env.PROD,
    hostname: typeof location === 'undefined' ? '' : location.hostname,
    automatizado: typeof navigator !== 'undefined' && navigator.webdriver === true,
  }
}

const LOCAIS = ['localhost', '127.0.0.1', '[::1]', '::1', '']

export function deveMedir(amb: Ambiente = ambienteAtual()): boolean {
  if (!amb.producao || amb.automatizado) return false
  return !LOCAIS.includes(amb.hostname) && !amb.hostname.endsWith('.localhost')
}

let iniciado = false

/** Insere o script uma vez. A contagem de páginas é manual (SPA). */
export function iniciarMedicao(amb: Ambiente = ambienteAtual()): boolean {
  if (iniciado || !deveMedir(amb)) return false
  iniciado = true
  const script = document.createElement('script')
  script.async = true
  script.src = GOATCOUNTER_SCRIPT
  script.dataset.goatcounter = GOATCOUNTER_URL
  script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true })
  script.addEventListener('load', () => registrarPagina(location.pathname))
  document.head.appendChild(script)

  // Delegação: qualquer link com data-evento conta como evento ao ser clicado.
  document.addEventListener('click', (e) => {
    const alvo = (e.target as Element | null)?.closest?.('a[data-evento]')
    const nome = alvo?.getAttribute('data-evento')
    if (nome) registrarEvento(nome)
  })
  return true
}

export function registrarPagina(caminho: string): void {
  window.goatcounter?.count({ path: caminho })
}

export function registrarEvento(nome: string): void {
  window.goatcounter?.count({ path: nome, title: nome, event: true })
}
