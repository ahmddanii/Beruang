import { shouldHydrate } from 'pinia'

export default definePayloadPlugin(() => {
  definePayloadReducer('skipHydrate', (data) => {
    if (!data || typeof data !== 'object') return false
    // Prevent "TypeError: obj.hasOwnProperty is not a function" on prototype-less objects (e.g. Object.create(null))
    if (typeof (data as any).hasOwnProperty !== 'function') return false
    try {
      return !shouldHydrate(data) && 1
    } catch {
      return false
    }
  })
})
