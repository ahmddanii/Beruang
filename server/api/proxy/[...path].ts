import { defineEventHandler, getQuery, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const path = event.context.params?.path || ''
  const query = getQuery(event)
  const queryString = new URLSearchParams(query as Record<string, string>).toString()

  // Target backend Express.js + Prisma ORM (port 5000)
  const target = `http://127.0.0.1:5000/api/${path}${queryString ? `?${queryString}` : ''}`

  return proxyRequest(event, target, {
    headers: {
      origin: '',
      referer: ''
    }
  })
})
