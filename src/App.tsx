import { useEffect, useState } from 'react'
import './styles/App.scss'
import { useAuth } from './context/AuthContext'
import { NavProvider } from './context/NavContext'
import AppLayout from './layouts/AppLayout'
import LoginScreen from './pages/LoginScreen'
import { MOBILE_BREAKPOINT } from './constants'
import type { ScreenMode } from './types'

function App() {
  const { user } = useAuth()
  const [screenMode, setScreenMode] = useState<ScreenMode>('desktop')

  useEffect(() => {
    const handleResize = () => {
      setScreenMode(window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop')
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!user) {
    return <LoginScreen />
  }

  return (
    <NavProvider>
      <AppLayout screenMode={screenMode} />
    </NavProvider>
  )
}

export default App
