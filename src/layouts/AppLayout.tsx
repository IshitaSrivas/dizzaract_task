import DesktopScreen from '../pages/ApiKeyScreen'
import MobileScreen from '../pages/ApiKeyMobileScreen'
import type { ScreenMode } from '../types'
import DesktopLayout from './DesktopLayout'
import MobileLayout from './MobileLayout'

type AppLayoutProps = {
  screenMode: ScreenMode
}

export default function AppLayout({ screenMode }: AppLayoutProps) {
  return (
    <main className={`app-shell ${screenMode}`}>
       {screenMode === 'desktop' ? (
        <DesktopLayout>
          <DesktopScreen />
        </DesktopLayout>
      ) : (
        <MobileLayout>
          <MobileScreen />
        </MobileLayout>
      )}
    </main>
  )
}
