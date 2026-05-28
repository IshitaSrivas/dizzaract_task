import options from '../assets/options.svg'
import { useEffect, useRef, useState } from 'react'
import '../styles/OptionPopup.scss'

export default function OptionsPopup() {
  const [active, setActive] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!popupRef.current) return
      if (popupRef.current.contains(event.target as Node)) return
      setActive(false)
    }

    if (active) {
      document.addEventListener('mousedown', handleDocumentClick)
      return () => document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [active])

  return (
    <div ref={popupRef} className="options-popup-container" onClick={() => setActive((prev) => !prev)}>
      <div className="options-icon" >
        <img src={options} alt="Options" />
      </div>

      {active ? (
        <div className="options-popup">
          <button type="button" className="options-button">
            Edit
          </button>

          <button type="button" className="options-button">
            Delete
          </button>

          <button type="button" className="options-button">
            Disable
          </button>
        </div>
      ) : null}
    </div>
  )
}
