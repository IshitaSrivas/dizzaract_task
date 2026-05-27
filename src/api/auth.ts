import type { LoginPayload, LoginResponse } from '../types'
// Fake login API call - simulates an API response
export async function loginAPI(payload: LoginPayload): Promise<LoginResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const { email, password } = payload
  const normalizedEmail = email.trim()
  const normalizedPassword = password.trim()

  if (!normalizedEmail || !normalizedPassword) {
    throw new Error('Invalid credentials')
  }

  // Fake successful login - in real app, this would validate against a backend
  return {
    email: normalizedEmail,
    token: `fake_token_${Date.now()}`,
  }
}

export async function logoutAPI(): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
}
