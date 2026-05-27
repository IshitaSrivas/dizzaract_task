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

