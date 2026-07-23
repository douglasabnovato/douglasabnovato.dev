import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'dark' | 'light'

function isValidTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light'
}

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme')
    return isValidTheme(stored) ? stored : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-solid transition-colors w-full"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
    </button>
  )
}