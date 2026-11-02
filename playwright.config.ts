import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  testMatch: '*.pw.ts',
  use: { baseURL: 'http://127.0.0.1:4174' },
  webServer: {
    command: 'npm run preview -- --port 4174 --host 127.0.0.1 --strictPort',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
  },
})
