import { defineEventHandler, getQuery, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const path = event.context.params?.path || ''
  const query = getQuery(event)
  const queryString = new URLSearchParams(query as Record<string, string>).toString()

  // Prioritaskan backend Express lokal jika berjalan, dengan fleksibilitas remote fallback
  const isRemotePreferred = process.env.USE_REMOTE_API === 'true'
  const localTarget = `http://127.0.0.1:5000/api/${path}${queryString ? `?${queryString}` : ''}`
  const remoteTarget = `https://beruang-api.fly.dev/api/${path}${queryString ? `?${queryString}` : ''}`

  const target = isRemotePreferred ? remoteTarget : localTarget

  return proxyRequest(event, target, {
    headers: {
      // Strip Origin and Referer so CORS/Sanctum behaves properly
      origin: '',
      referer: ''
    }
  })
})
