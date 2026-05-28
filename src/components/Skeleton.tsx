import '../styles/Skeleton.scss'
import type { SkeletonProps } from '../types'

export function Skeleton({ width = '100%', height = 14, borderRadius = '6px', className = '' }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  )
}

/** Mimics the desktop API Keys page (header + table rows) */
export function DesktopApiKeysSkeleton() {
  const colWidths = ['22%', '16%', '10%', '12%', '12%', '12%', '4%']
  return (
    <div className="api-skel">
      <div className="api-skel__header">
        <div className="api-skel__title-group">
          <Skeleton width={150} height={26} borderRadius="8px" />
          <Skeleton width={280} height={14} borderRadius="6px" />
        </div>
        <Skeleton width={130} height={36} borderRadius="12px" />
      </div>

      <div className="api-skel__table">
        {/* header row */}
        <div className="api-skel__row">
          {colWidths.map((w, i) => (
            <Skeleton key={i} width={w} height={12} borderRadius="4px" />
          ))}
        </div>
        {/* data rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="api-skel__row">
            {colWidths.map((w, j) => (
              <Skeleton key={j} width={w} height={18} borderRadius="7px" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Mimics the mobile API Keys card list */
export function MobileApiKeysSkeleton() {
  return (
    <div className="mobile-skel">
      <div className="mobile-skel__header">
        <Skeleton width={130} height={34} borderRadius="12px" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="mobile-skel__card">
          <div className="mobile-skel__row">
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Skeleton width="55%" height={14} borderRadius="6px" />
              <Skeleton width="75%" height={11} borderRadius="5px" />
            </div>
            <Skeleton width={28} height={28} borderRadius="50%" />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Generic placeholder skeleton for unimplemented pages */
export function PageSkeleton() {
  return (
    <div className="page-skel">
      <div className="page-skel__header">
        <Skeleton width={200} height={26} borderRadius="8px" />
        <Skeleton width={320} height={14} borderRadius="6px" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="page-skel__section">
          <div className="page-skel__row">
            <Skeleton width="45%" height={16} borderRadius="6px" />
            <Skeleton width="18%" height={14} borderRadius="6px" />
          </div>
          <Skeleton width="100%" height={1} borderRadius="0" />
          {Array.from({ length: 3 }).map((_, j) => (
            <div key={j} className="page-skel__row">
              <Skeleton width={`${32 + j * 12}%`} height={13} borderRadius="5px" />
              <Skeleton width={`${18 + j * 6}%`} height={13} borderRadius="5px" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Chat-specific placeholder (not a generic skeleton) */
export function ChatPlaceholder() {
  const bubbles = [
    { right: false, lines: [200, 140] },
    { right: true,  lines: [160] },
    { right: false, lines: [240, 180, 100] },
    { right: true,  lines: [120, 90] },
  ]
  return (
    <div className="chat-placeholder">
      <div className="chat-placeholder__messages">
        {bubbles.map((b, i) => (
          <div key={i} className={`chat-placeholder__bubble${b.right ? ' chat-placeholder__bubble--right' : ''}`}>
            <div className="chat-placeholderavtar" />
            <div className="chat-placeholder__text">
              {b.lines.map((w, j) => (
                <Skeleton key={j} width={w} height={14} borderRadius="8px" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-placeholder__input-row">
        <Skeleton width="100%" height={40} borderRadius="12px" />
        <Skeleton width={40} height={40} borderRadius="10px" />
      </div>
    </div>
  )
}
