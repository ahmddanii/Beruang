export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()

  router.afterEach((to, from) => {
    // Only scroll if path changes or query without hash
    if (to.path !== from.path || !to.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

      nextTick(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

        // Reset scroll position on any scrollable container (e.g., dashboard main, overflow containers)
        const scrollContainers = document.querySelectorAll<HTMLElement>(
          'main, .overflow-y-auto, [data-scroll-container]'
        )
        scrollContainers.forEach((el) => {
          el.scrollTop = 0
        })
      })
    }
  })
})
