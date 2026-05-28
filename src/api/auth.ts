import type { LoginPayload, LoginResponse } from '../types'

export async function loginAPI(payload: LoginPayload): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const { email, password } = payload
  const normalizedEmail = email.trim()
  const normalizedPassword = password.trim()

  if (!normalizedEmail || !normalizedPassword) {
    throw new Error('Invalid credentials')
  }
  return {
    email: normalizedEmail,
    token: `fake_token_${Date.now()}`,
  }
}

export async function logoutAPI(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
}
