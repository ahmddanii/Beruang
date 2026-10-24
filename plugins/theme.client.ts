export default defineNuxtPlugin(() => {
  const { initTheme } = useThemeMode()
  const { initLanguage } = useLanguage()
  initTheme()
  initLanguage()
})
