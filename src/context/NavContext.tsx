import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type NavContextValue = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const NavContext = createContext<NavContextValue | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('api')

  return <NavContext.Provider value={{ activeTab, setActiveTab }}>{children}</NavContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used within NavProvider')
  return ctx
}
