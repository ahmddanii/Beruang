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
 * Universal API fetch wrapper for Beruang Live Laravel Backend
 * Automatically handles baseURL, Sanctum Bearer token, and 401 unauthorized redirect.
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

  const baseUrl = config.public.apiBaseUrl || 'https://beruang-api.fly.dev/api'
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
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

    // If unauthorized, clear token and redirect to login
    if (status === 401) {
      token.value = null
      if (import.meta.client) {
        const currentPath = window.location.pathname
        if (!currentPath.startsWith('/masuk') && !currentPath.startsWith('/daftar')) {
          navigateTo('/masuk')
        }
      }
    }

    throw new ApiError(message, status, errorData)
  }
}
