import type { RouterConfig } from '@nuxt/schema'

// Global Nuxt Router scroll behavior configuration
// Ensures that on route transitions, the view scrolls to the very top across all pages and roles
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, left: 0 }
  }
}
