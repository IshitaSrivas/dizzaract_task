import { useEffect, useRef } from 'react'
import type { ModelOption } from '../types'

export default function ModelDropdown({
  options,
  selected,
  onSelect,
  onClose,
}: {
  options: ModelOption[]
  selected: string
  onSelect: (id: string) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div className="model-dropdown" ref={ref}>
      {options.map((opt) => (
        <button
          key={opt.id}
          className={`model-dropdown__item${selected === opt.id ? ' model-dropdown__item--active' : ''}`}
          onClick={() => {
            onSelect(opt.id)
            onClose()
          }}
        >
          <span className="model-dropdown__icon">
            <img src={opt.icon} alt={opt.name} width={18} height={18} />
          </span>
          <span className="model-dropdown__text">
            <span className="model-dropdown__name">{opt.name}</span>
            <span className="model-dropdown__desc">{opt.description}</span>
          </span>
          {selected === opt.id && (
            <svg
              className="model-dropdown__check"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="14"
              height="14"
            >
              <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}
