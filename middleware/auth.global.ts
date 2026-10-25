import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  // 1. Selalu pastikan sesi terinisialisasi dari cookie/localStorage terlebih dahulu
  if (!authStore.isAuthenticated) {
    await authStore.initSession()
  }

  const token = useCookie<string | null>('beruang_token').value || authStore.token

  const isProtectedRoute = (
    to.path.startsWith('/dashboard') ||
    to.path.startsWith('/konsultan') ||
    to.path.startsWith('/investor') ||
    to.path.startsWith('/admin')
  )

  // 2. Cek rute privat yang membutuhkan autentikasi
  if (isProtectedRoute) {
    if (!token && !authStore.isAuthenticated) {
      return navigateTo('/masuk')
    }

    if (!authStore.isAuthenticated) {
      return navigateTo('/masuk')
    }

    // Jika sudah terdaftar tapi belum menyelesaikan onboarding -> arahkan ke onboarding
    if (!authStore.isOnboarded) {
      return navigateTo(`/onboarding?role=${authStore.currentRole}`)
    }

    // 2b. RBAC Guard: Akun biasa (bukan fikri@kopisenja.id atau Admin) hanya boleh mengakses workspace sesuai perannya
    if (!authStore.canSwitchRole && authStore.currentUser) {
      const userRole = authStore.currentUser.role
      const defaultRolePath = (
        userRole === 'CONSULTANT' ? '/konsultan' :
        userRole === 'INVESTOR' ? '/investor' :
        userRole === 'ADMIN' ? '/admin' :
        '/dashboard'
      )

      if (to.path.startsWith('/admin') && userRole !== 'ADMIN') {
        return navigateTo(defaultRolePath)
      }
      if (to.path.startsWith('/konsultan') && userRole !== 'CONSULTANT') {
        return navigateTo(defaultRolePath)
      }
      if (to.path.startsWith('/investor') && userRole !== 'INVESTOR') {
        return navigateTo(defaultRolePath)
      }
      if (to.path.startsWith('/dashboard') && userRole !== 'UMKM') {
        return navigateTo(defaultRolePath)
      }
    }
  }

  // 3. Jika user sudah login dan mencoba membuka halaman masuk atau daftar
  if ((to.path === '/masuk' || to.path === '/daftar') && (token || authStore.isAuthenticated)) {
    if (authStore.isAuthenticated) {
      if (authStore.isOnboarded) {
        const target = (
          authStore.currentRole === 'CONSULTANT' ? '/konsultan' :
          authStore.currentRole === 'INVESTOR' ? '/investor' :
          authStore.currentRole === 'ADMIN' ? '/admin' :
          '/dashboard'
        )
        return navigateTo(target)
      } else {
        return navigateTo(`/onboarding?role=${authStore.currentRole}`)
      }
    }
  }

  // 4. Jika user mencoba mengakses halaman onboarding tapi sudah selesai onboarding -> lempar ke dashboard
  if (to.path === '/onboarding' && (token || authStore.isAuthenticated)) {
    if (authStore.isAuthenticated && authStore.isOnboarded) {
      const target = (
        authStore.currentRole === 'CONSULTANT' ? '/konsultan' :
        authStore.currentRole === 'INVESTOR' ? '/investor' :
        authStore.currentRole === 'ADMIN' ? '/admin' :
        '/dashboard'
      )
      return navigateTo(target)
    }
  }
})
