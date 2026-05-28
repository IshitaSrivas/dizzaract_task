import DesktopScreen from '../pages/ApiKeyScreen'
import MobileScreen from '../pages/ApiKeyMobileScreen'
import type { ScreenMode } from '../types'
import DesktopLayout from './DesktopLayout'
import MobileLayout from './MobileLayout'
import { useNav } from '../context/NavContext'
import { PageSkeleton, ChatPlaceholder } from '../components/Skeleton'

type AppLayoutProps = {
  screenMode: ScreenMode
}

function resolveContent(tab: string, mobile: boolean) {
  if (tab === 'api') return mobile ? <MobileScreen /> : <DesktopScreen />
  if (tab === 'chat') return <ChatPlaceholder />
  return <PageSkeleton />
}

export default function AppLayout({ screenMode }: AppLayoutProps) {
  const { activeTab } = useNav()
  const content = resolveContent(activeTab, screenMode === 'mobile')

  return (
    <main className={`app-shell ${screenMode}`}>
      {screenMode === 'desktop' ? (
        <DesktopLayout>{content}</DesktopLayout>
      ) : (
        <MobileLayout>{content}</MobileLayout>
      )}
    </main>
  )
}
