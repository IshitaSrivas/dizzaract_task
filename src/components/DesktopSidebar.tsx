import { useAuth } from '../context/AuthContext'
import '../styles/DesktopSidebar.scss'
import { sidebarSections } from '../constants'
import logo from '../assets/Logo.svg'

export default function DesktopSidebar() {
  const { user } = useAuth()

  return (
    <aside className="desktop-sidebar">
      <div className="sidebar-brand">
        <div className="brand-stack">
          <img src={logo} alt="FARLABS logo" className="brand-logo" />
        </div>
        <button className="sidebar-toggle" aria-label="Open sidebar menu">
          ☰
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {sidebarSections.map((section) => (
          <section key={section.title} className="sidebar-section">
            <p className="sidebar-section-title">{section.title}</p>
            {section.items.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`sidebar-item${item.active ? ' active' : ''}`}
              >
                <span className="sidebar-icon" aria-hidden="true">
                  <img src={item.icon} alt={`${item.label} icon`} />
                </span>
                <span className="sidebar-item-label">{item.label}</span>
              </button>
            ))}
          </section>
        ))}
      </nav>
    </aside>
  )
}
