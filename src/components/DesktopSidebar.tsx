import { useAuth } from '../context/AuthContext'

export default function DesktopSidebar() {
  const { user } = useAuth()

  return (
    <aside className="desktop-sidebar">
  
    </aside>
  )
}
