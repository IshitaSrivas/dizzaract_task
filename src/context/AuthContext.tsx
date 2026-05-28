import { createContext, useContext, useState, type ReactNode } from 'react'
import { loginAPI, logoutAPI } from '../api/auth'
import type { LoginPayload, AuthContextValue, AuthUser } from '../types'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const signIn = async (credentials: LoginPayload): Promise<boolean> => {
    try {
      const response = await loginAPI(credentials)
      setUser({ email: response.email, token: response.token })
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const signOut = async () => {
    try {
      await logoutAPI()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
