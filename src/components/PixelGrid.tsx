import { CENTER_ROW, GRID_COLS, GRID_ROWS } from '../constants'

export default function PixelGrid({
  active,
  colors,
}: {
  active: boolean
  colors: [string, string, string]
}) {
  const total = GRID_COLS * GRID_ROWS
  return (
    <div className="pixel-grid" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / GRID_COLS)
        const col = i % GRID_COLS
        const delay = col * 65 + Math.abs(row - CENTER_ROW) * 130
        const color = colors[i % 3]
        return (
          <div
            key={i}
            className="pixel-grid__cell"
            style={
              {
                animationDelay: `${delay}ms`,
                animationPlayState: active ? 'running' : 'paused',
                opacity: active ? undefined : 0.14,
                '--cell-lit': color,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
