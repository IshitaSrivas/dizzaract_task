import type { ApiKey } from '../types'
import {initialKeys} from '../constants'



function randomId(prefix = 'k') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

function maskKey(k: string) {
  if (!k) return ''
  return `${k.slice(0, 3)}...${k.slice(-4)}`
}

let store = initialKeys.slice()

export async function fetchApiKeys(userId?: string): Promise<ApiKey[]> {
  // simulate network latency
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(store.map((k) => ({ ...k })))
    }, 400)
  })
}

export async function createApiKey(userId?: string, name?: string): Promise<ApiKey> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const key = `${Math.random().toString(36).slice(2, 12)}`
      const newKey: ApiKey = {
        id: randomId('k'),
        name: name || `new_key_${Math.random().toString(36).slice(2, 4)}`,
        key,
        status: 'Active',
        createdAt: new Date().toISOString().slice(0, 10),
        lastUsed: 'Never',
      }
      store = [newKey, ...store]
      resolve({ ...newKey })
    }, 500)
  })
}

export function maskApiKey(k: string) {
  return maskKey(k)
}
