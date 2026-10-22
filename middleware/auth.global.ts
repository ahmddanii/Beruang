import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const token = useCookie<string | null>('beruang_token').value || authStore.token

  const isProtectedRoute = (
    to.path.startsWith('/dashboard') ||
    to.path.startsWith('/konsultan') ||
    to.path.startsWith('/investor') ||
    to.path.startsWith('/admin')
  )

  // 1. Cek rute privat yang membutuhkan login & onboarding selesai
  if (isProtectedRoute) {
    // Jika tidak terautentikasi / belum ada token -> lempar ke login
    if (!token) {
      return navigateTo('/masuk')
    }

    if (!authStore.isAuthenticated) {
      await authStore.initSession()
    }

    if (!authStore.isAuthenticated) {
      return navigateTo('/masuk')
    }

    // Jika sudah terdaftar tapi belum menyelesaikan onboarding -> wajib tuntaskan onboarding dulu
    if (!authStore.isOnboarded) {
      return navigateTo(`/onboarding?role=${authStore.currentRole}`)
    }
  }

  // 2. Jika user mencoba mengakses halaman onboarding tapi sudah selesai onboarding -> lempar ke dashboard
  if (to.path === '/onboarding' && token) {
    if (!authStore.isAuthenticated) {
      await authStore.initSession()
    }
    if (authStore.isAuthenticated && authStore.isOnboarded) {
      const target = (
        authStore.currentRole === 'CONSULTANT' ? '/konsultan' :
        authStore.currentRole === 'INVESTOR' ? '/investor' :
        '/dashboard'
      )
      return navigateTo(target)
    }
  }
})
