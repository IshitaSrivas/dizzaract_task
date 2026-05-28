import { useNav } from '../context/NavContext'
import { navItems } from '../constants'
import { sidebarSections } from '../constants'

function getLabelForTab(tab: string): string {
  const mobile = navItems.find((i) => i.key === tab)
  if (mobile) return mobile.label
  for (const section of sidebarSections) {
    const item = section.items.find((i) => i.key === tab)
    if (item) return item.label
  }
  return tab
}

export default function MobileTopHeader() {
  const { activeTab } = useNav()

  return (
    <header className="mobile-top-header">
      <div className="mobile-top-header__title">{getLabelForTab(activeTab)}</div>
    </header>
  )
}
