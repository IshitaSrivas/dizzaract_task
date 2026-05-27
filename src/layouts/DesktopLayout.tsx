import type { ReactNode } from 'react'
import DesktopSidebar from '../components/DesktopSidebar'

type DesktopLayoutProps = {
  children: ReactNode
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="desktop-layout">
      <DesktopSidebar />
      <section className="desktop-main">
        <div className= "desktop-bar"></div>
        <div className= "desktop-content">{children}</div>
        </section>
    </div>
  )
}
