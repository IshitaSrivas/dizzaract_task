export type ScreenMode = 'desktop' | 'mobile'

export type AuthUser = {
  email: string
  token: string
}

export type TableProps = {
  keys: ApiKey[]
  onEdit: (id: string, name: string, expires: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onDisable: (id: string) => Promise<void>
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

export type ModelOption = {
  id: string
  name: string
  description: string
  icon: string
  colors: [string, string, string]
}

export type Message = {
  id: number
  role: 'user' | 'ai'
  text: string
}

export type Props = {
  keyData: ApiKey
  onEdit: (id: string, name: string, expires: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onDisable: (id: string) => Promise<void>
}

export type Mode = 'menu' | 'edit'

export type SkeletonProps = {
  width?: string | number
  height?: string | number
  borderRadius?: string
  className?: string
}
