import type { ReactNode } from 'react'
import DesktopSidebar from '../components/DesktopSidebar'
import '../styles/DesktopBar.scss'

type DesktopLayoutProps = {
  children: ReactNode
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="desktop-layout">
      <DesktopSidebar />
      <section className="desktop-main">
        <div className="desktop-bar">
          <div className="desktop-bar__right">
            <div className="balance-pill">$145,20</div>
            <div className="avatar">RG</div>
          </div>
        </div>
        <div className= "desktop-content">{children}</div>
      </section>
    </div>
  )
}
