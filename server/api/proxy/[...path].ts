import { defineEventHandler, getQuery, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const path = event.context.params?.path || ''
  const query = getQuery(event)
  const queryString = new URLSearchParams(query as Record<string, string>).toString()
  const target = `https://beruang-api.fly.dev/api/${path}${queryString ? `?${queryString}` : ''}`

  return proxyRequest(event, target, {
    headers: {
      // Strip Origin and Referer so Laravel Sanctum does not mistakenly
      // treat decoupled Bearer API requests as stateful SPA session calls
      origin: '',
      referer: ''
    }
  })
})
