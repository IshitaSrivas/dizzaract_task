import { useState } from 'react'
import '../styles/SuccessPopup.scss'

type Props = {
  message: string
  copyValue?: string
  copyLabel?: string
  onClose: () => void
}

export default function SuccessPopup({ message, copyValue, copyLabel = 'Copy', onClose }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!copyValue) return
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="success-overlay" onClick={onClose}>
      <div className="success-popup" onClick={(e) => e.stopPropagation()}>
        <div className="success-check">✓</div>
        <div className="success-message">{message}</div>
        {copyValue && (
          <div className="success-copy-row">
            <code className="success-copy-value">{copyValue}</code>
            <button className="success-copy-btn" type="button" onClick={handleCopy}>
              {copied ? 'Copied!' : copyLabel}
            </button>
          </div>
        )}
        <button className="success-close-btn" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
