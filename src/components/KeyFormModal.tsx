import React, { useState } from 'react'
import '../styles/Modal.scss'

type Props = {
  mode: 'create' | 'edit'
  initial?: { name: string; expires: string }
  onSubmit: (name: string, expires: string) => Promise<void>
  onClose: () => void
}

export default function KeyFormModal({ mode, initial, onSubmit, onClose }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [expires, setExpires] = useState(initial?.expires ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Key name is required')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await onSubmit(name.trim(), expires)
    } catch {
      setError('Operation failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{mode === 'create' ? 'Create API Key' : 'Edit API Key'}</h3>
          <button className="modal-close" type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <label className="modal-label">
            Key Name
            <input
              className="modal-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. my_api_key"
              autoFocus
            />
          </label>
          <label className="modal-label">
            Expiry Date
            <input
              className="modal-input"
              type="date"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
            />
          </label>
          {error && <div className="modal-error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="modal-btn modal-btn--cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn modal-btn--submit" disabled={loading}>
              {loading
                ? mode === 'create'
                  ? 'Creating...'
                  : 'Saving...'
                : mode === 'create'
                  ? 'Create'
                  : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
