export type ScreenMode = 'desktop' | 'mobile'

export type AuthUser = {
  email: string
  token: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  email: string
  token: string
}

export type AuthContextValue = {
  user: AuthUser | null
  signIn: (credentials: LoginPayload) => Promise<boolean>
  signOut: () => Promise<void>
}

export type ApiKey = {
  id: string
  name: string
  key: string
  status: 'Active' | 'Expired'
  expires?: string
  createdAt: string
  lastUsed?: string
}

export type ApiKeysTableProps = {
  keys: ApiKey[]
}

