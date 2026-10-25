export type ThemeMode = 'light' | 'dark' | 'system'

export function useThemeMode() {
  const themeMode = useState<ThemeMode>('beruang-theme-mode', () => 'system')
  const effectiveTheme = useState<'light' | 'dark'>('beruang-effective-theme', () => 'light')

  const applyTheme = (mode: ThemeMode) => {
    if (!import.meta.client) return

    let resolved: 'light' | 'dark' = 'light'
    if (mode === 'dark') {
      resolved = 'dark'
    } else if (mode === 'light') {
      resolved = 'light'
    } else {
      // system: evaluate user device prefers-color-scheme
      resolved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    effectiveTheme.value = resolved
    themeMode.value = mode

    if (resolved === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    try {
      localStorage.setItem('beruang-theme', mode)
    } catch {
      // no-op if storage is restricted
    }
  }

  const setThemeMode = (mode: ThemeMode) => {
    applyTheme(mode)
  }

  const initTheme = () => {
    if (!import.meta.client) return
    let saved: ThemeMode | null = null
    try {
      saved = localStorage.getItem('beruang-theme') as ThemeMode | null
    } catch {
      saved = null
    }

    const initialMode: ThemeMode = saved === 'dark' || saved === 'light' || saved === 'system' ? saved : 'system'
    applyTheme(initialMode)

    // Listen to OS system color-scheme changes when in 'system' mode
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = (e: MediaQueryListEvent) => {
        if (themeMode.value === 'system') {
          const newTheme = e.matches ? 'dark' : 'light'
          effectiveTheme.value = newTheme
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      }

      try {
        mediaQuery.addEventListener('change', listener)
      } catch {
        // Fallback for older browsers
        mediaQuery.addListener(listener)
      }
    }
  }

  return {
    themeMode,
    effectiveTheme,
    setThemeMode,
    initTheme
  }
}
