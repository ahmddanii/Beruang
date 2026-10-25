export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data: T
  meta?: {
    total?: number
    page?: number
    perPage?: number
    lastPage?: number
    [key: string]: any
  }
}

export class ApiError extends Error {
  status: number
  data?: any

  constructor(message: string, status: number = 500, data?: any) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * Universal API fetch wrapper for Beruang Express.js + Prisma Backend
 * Automatically handles baseURL, JWT Bearer token, and 401 unauthorized redirect.
 */
export const useApi = async <T = any>(
  endpoint: string,
  options: Record<string, any> = {}
): Promise<ApiResponse<T>> => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('beruang_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    path: '/'
  })

  let normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  // Prevent double /api prefix if caller passes '/api/...'
  if (normalizedEndpoint.startsWith('/api/')) {
    normalizedEndpoint = normalizedEndpoint.replace('/api/', '/')
  }

  let baseUrl = config.public.apiBaseUrl || 'http://localhost:5000/api'

  // In browser on localhost, route through Nitro proxy (/api/proxy) to port 5000
  if (import.meta.client && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    baseUrl = '/api/proxy'
  }

  const url = `${baseUrl}${normalizedEndpoint}`

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {})
  }

  try {
    const response = await $fetch<ApiResponse<T>>(url, {
      ...options,
      headers
    })

    return response
  } catch (err: any) {
    const status = err?.response?.status || err?.status || 500
    const message = err?.response?._data?.message || err?.data?.message || err?.message || 'Terjadi kesalahan pada server.'
    const errorData = err?.response?._data || err?.data

    // Hanya bersihkan token dan redirect ke login jika sesi auth utama (/auth/me) yang 401
    if (status === 401 && normalizedEndpoint === '/auth/me') {
      const isDevToken = token.value?.startsWith('demo-') || token.value?.startsWith('google-session') || token.value?.startsWith('beruang-reg')
      if (!isDevToken) {
        token.value = null
        if (import.meta.client) {
          try {
            localStorage.removeItem('beruang_token')
            localStorage.removeItem('beruang_user')
          } catch {}
          const currentPath = window.location.pathname
          if (!currentPath.startsWith('/masuk') && !currentPath.startsWith('/daftar')) {
            navigateTo('/masuk')
          }
        }
      }
    }

    throw new ApiError(message, status, errorData)
  }
}
