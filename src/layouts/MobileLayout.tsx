import type { ReactNode } from 'react'
import MobileBottomNav from '../components/MobileBottomNav'
import MobileTopHeader from '../components/MobileTopHeader'

type MobileLayoutProps = {
  children: ReactNode
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="mobile-layout">
      <MobileTopHeader />
      <div className="mobile-center-screen">{children}</div>
      <MobileBottomNav />
    </div>
  )
}
