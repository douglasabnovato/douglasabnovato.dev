import { defineConfig } from '@playwright/test'

// Porta própria por padrão; PW_PORT troca a porta quando outra cópia do site já usa a 4174.
const porta = process.env.PW_PORT ?? '4174'

export default defineConfig({
  testDir: 'e2e',
  testMatch: '*.pw.ts',
  use: { baseURL: `http://127.0.0.1:${porta}` },
  webServer: {
    command: `npm run preview -- --port ${porta} --host 127.0.0.1 --strictPort`,
    url: `http://127.0.0.1:${porta}`,
    reuseExistingServer: false,
  },
})
