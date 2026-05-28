import '../styles/MobileBottomNav.scss'
import { navItems } from '../constants'
import { useNav } from '../context/NavContext'

export default function MobileBottomNav() {
  const { activeTab, setActiveTab } = useNav()

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <button
          key={item.key}
          type="button"
          className={activeTab === item.key ? 'active' : ''}
          aria-current={activeTab === item.key ? 'page' : undefined}
          onClick={() => setActiveTab(item.key)}
        >
          <span className="nav-icon" aria-hidden="true">
            <img src={item.icon} alt={item.label} />
          </span>
          <span className="nav-label">{item.label}</span>
          {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
        </button>
      ))}
    </nav>
  )
}
