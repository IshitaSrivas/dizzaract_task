import type { ApiKey } from '../types'
import { DUMMY_RESPONSES, initialKeys } from '../constants'

function randomId(prefix = 'k') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

function maskKey(k: string) {
  if (!k) return ''
  return `${k.slice(0, 3)}...${k.slice(-4)}`
}

let store = initialKeys.slice()

export async function fetchApiKeys(_userId?: string): Promise<ApiKey[]> {
  // simulate network latency
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(store.map((k) => ({ ...k })))
    }, 400)
  })
}

export async function createApiKey(
  _userId?: string,
  name?: string,
  expires?: string,
): Promise<ApiKey> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const key = `${Math.random().toString(36).slice(2, 12)}`
      const newKey: ApiKey = {
        id: randomId('k'),
        name: name || `new_key_${Math.random().toString(36).slice(2, 4)}`,
        key,
        status: 'Active',
        expires: expires || undefined,
        createdAt: new Date().toISOString().slice(0, 10),
        lastUsed: 'Never',
      }
      store = [newKey, ...store]
      resolve({ ...newKey })
    }, 500)
  })
}

export async function editApiKey(id: string, name: string, expires: string): Promise<ApiKey> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = store.findIndex((k) => k.id === id)
      if (idx === -1) return reject(new Error('Key not found'))
      store[idx] = { ...store[idx], name, expires: expires || undefined }
      resolve({ ...store[idx] })
    }, 400)
  })
}

export async function deleteApiKey(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      store = store.filter((k) => k.id !== id)
      resolve()
    }, 300)
  })
}

export async function disableApiKey(id: string): Promise<ApiKey> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = store.findIndex((k) => k.id === id)
      if (idx === -1) return reject(new Error('Key not found'))
      const today = new Date().toISOString().slice(0, 10)
      store[idx] = { ...store[idx], status: 'Expired', expires: today }
      resolve({ ...store[idx] })
    }, 300)
  })
}

export function maskApiKey(k: string) {
  return maskKey(k)
}

export function fakeChatApi(userMsg: string): Promise<string> {
  void userMsg
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(DUMMY_RESPONSES[Math.floor(Math.random() * DUMMY_RESPONSES.length)]),
      2800,
    ),
  )
}
