import { ref, onMounted, onBeforeUnmount } from 'vue'

const isCollapsed = ref(false)
const isMobileOpen = ref(false)
let isInitialized = false

export function useSidebar() {
  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value
    if (import.meta.client) {
      try {
        localStorage.setItem('beruang_sidebar_collapsed', isCollapsed.value ? 'true' : 'false')
      } catch (_) {}
    }
  }

  function setCollapsed(val: boolean) {
    isCollapsed.value = val
    if (import.meta.client) {
      try {
        localStorage.setItem('beruang_sidebar_collapsed', val ? 'true' : 'false')
      } catch (_) {}
    }
  }

  function toggleMobile() {
    isMobileOpen.value = !isMobileOpen.value
  }

  function openMobile() {
    isMobileOpen.value = true
  }

  function closeMobile() {
    isMobileOpen.value = false
  }

  onMounted(() => {
    if (import.meta.client && !isInitialized) {
      isInitialized = true
      try {
        const saved = localStorage.getItem('beruang_sidebar_collapsed')
        if (saved !== null) {
          isCollapsed.value = saved === 'true'
        }
      } catch (_) {}
    }
  })

  return {
    isCollapsed,
    isMobileOpen,
    toggleCollapse,
    setCollapsed,
    toggleMobile,
    openMobile,
    closeMobile
  }
}
