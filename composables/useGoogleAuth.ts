import { ref, computed } from 'vue'

declare global {
  interface Window {
    google?: any
  }
}

let gsiScriptLoaded = false

function loadGsiScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.google?.accounts?.id || gsiScriptLoaded) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const existing = document.getElementById('google-gsi-client')
    if (existing) {
      gsiScriptLoaded = true
      return resolve()
    }
    const script = document.createElement('script')
    script.id = 'google-gsi-client'
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      gsiScriptLoaded = true
      resolve()
    }
    script.onerror = (err) => reject(err)
    document.head.appendChild(script)
  })
}

export function useGoogleAuth() {
  const config = useRuntimeConfig()
  const googleClientId = computed(() => (config.public.googleClientId as string) || '')
  const hasGoogleClientId = computed(() => Boolean(googleClientId.value && googleClientId.value.trim().length > 0))
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Memicu alur Google OAuth (Google Identity Services popup resmi).
   * Membuka popup Google resmi dan mengembalikan token kredensial untuk diteruskan ke backend.
   */
  async function triggerGoogleLogin(
    onSuccess: (credential: string) => Promise<void> | void
  ) {
    if (!hasGoogleClientId.value) {
      error.value = 'Kredensial Google Client ID belum disetel di .env (NUXT_PUBLIC_GOOGLE_CLIENT_ID)'
      return false
    }

    loading.value = true
    error.value = null

    try {
      await loadGsiScript()

      // 1. Prioritaskan Google OAuth2 Token Client (Popup Resmi Google accounts.google.com)
      if (window.google?.accounts?.oauth2) {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId.value,
          scope: 'email profile openid',
          callback: async (response: any) => {
            loading.value = false
            if (response?.access_token) {
              await onSuccess(response.access_token)
            } else if (response?.error) {
              error.value = response.error_description || response.error || 'Autentikasi Google dibatalkan'
            }
          },
          error_callback: (err: any) => {
            loading.value = false
            error.value = err?.message || 'Gagal membuka jendela login Google. Pastikan popup tidak diblokir.'
            console.warn('Google OAuth popup error:', err)
          }
        })

        tokenClient.requestAccessToken({ prompt: 'select_account' })
        return true
      }

      // 2. Fallback ke Google Identity Services One-Tap jika oauth2 belum terinisialisasi
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: googleClientId.value,
          callback: async (response: any) => {
            loading.value = false
            if (response?.credential) {
              await onSuccess(response.credential)
            } else {
              error.value = 'Tidak ada kredensial yang diterima dari Google.'
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true
        })

        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            loading.value = false
            error.value = 'Google Sign-In prompt ditutup atau terblokir.'
          } else if (notification.isDismissedMoment()) {
            loading.value = false
          }
        })

        return true
      } else {
        throw new Error('Google Identity Services SDK tidak tersedia')
      }
    } catch (err: any) {
      loading.value = false
      error.value = err?.message || 'Gagal menginisialisasi Google Sign-In'
      return false
    }
  }

  /**
   * Merender tombol resmi Google Identity Services ke elemen DOM target jika diinginkan
   */
  async function renderGoogleButton(
    container: HTMLElement | string,
    onSuccess: (credential: string) => Promise<void> | void,
    options: Record<string, any> = {}
  ) {
    if (!hasGoogleClientId.value) return false

    try {
      await loadGsiScript()
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: googleClientId.value,
          callback: async (response: any) => {
            if (response?.credential) {
              await onSuccess(response.credential)
            }
          }
        })
        const el = typeof container === 'string' ? document.getElementById(container) : container
        if (el) {
          window.google.accounts.id.renderButton(el, {
            theme: 'outline',
            size: 'large',
            width: '100%',
            shape: 'pill',
            text: 'continue_with',
            ...options
          })
          return true
        }
      }
    } catch (err) {
      console.warn('Gagal merender tombol Google:', err)
    }
    return false
  }

  return {
    googleClientId,
    hasGoogleClientId,
    loading,
    error,
    triggerGoogleLogin,
    renderGoogleButton
  }
}
