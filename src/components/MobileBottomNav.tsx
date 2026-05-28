import '../styles/MobileBottomNav.scss'
import { navItems } from '../constants'


export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <button
          key={item.key}
          type="button"
          className={item.active ? 'active' : ''}
          aria-current={item.active ? 'page' : undefined}
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
