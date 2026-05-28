import options from '../assets/options.svg'
import React, { useEffect, useRef, useState } from 'react'
import '../styles/OptionPopup.scss'
import type { ApiKey } from '../types'

type Props = {
  keyData: ApiKey
  onEdit: (id: string, name: string, expires: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onDisable: (id: string) => Promise<void>
}

type Mode = 'menu' | 'edit'

export default function OptionsPopup({ keyData, onEdit, onDelete, onDisable }: Props) {
  const [active, setActive] = useState(false)
  const [mode, setMode] = useState<Mode>('menu')
  const [name, setName] = useState(keyData.name)
  const [expires, setExpires] = useState(keyData.expires ?? '')
  const [deletingLoading, setDeletingLoading] = useState(false)
  const [disablingLoading, setDisablingLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!popupRef.current) return
      if (popupRef.current.contains(event.target as Node)) return
      setActive(false)
      setMode('menu')
    }

    if (active) {
      document.addEventListener('mousedown', handleDocumentClick)
      return () => document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [active])

  const openEdit = () => {
    setName(keyData.name)
    setExpires(keyData.expires ?? '')
    setMode('edit')
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setEditLoading(true)
    try {
      await onEdit(keyData.id, name.trim(), expires)
      setActive(false)
      setMode('menu')
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeletingLoading(true)
    try {
      await onDelete(keyData.id)
      setActive(false)
    } finally {
      setDeletingLoading(false)
    }
  }

  const handleDisable = async () => {
    setDisablingLoading(true)
    try {
      await onDisable(keyData.id)
      setActive(false)
    } finally {
      setDisablingLoading(false)
    }
  }

  return (
    <div ref={popupRef} className="options-popup-container">
      <div className="options-icon" onClick={() => setActive((prev) => !prev)}>
        <img src={options} alt="Options" />
      </div>

      {active && (
        <div className="options-popup" onClick={(e) => e.stopPropagation()}>
          {mode === 'menu' ? (
            <>
              <button type="button" className="options-button" onClick={openEdit}>
                Edit
              </button>
              <button
                type="button"
                className="options-button"
                onClick={handleDelete}
                disabled={deletingLoading || disablingLoading}
              >
                {deletingLoading ? 'Deleting…' : 'Delete'}
              </button>
              <button
                type="button"
                className="options-button"
                onClick={handleDisable}
                disabled={disablingLoading || deletingLoading}
              >
                {disablingLoading ? 'Disabling…' : 'Disable'}
              </button>
            </>
          ) : (
            <form className="options-form" onSubmit={handleEdit}>
              <div className="options-form-title">Edit Key</div>
              <label className="options-form-label">
                Name
                <input
                  className="options-form-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
              </label>
              <label className="options-form-label">
                Expires
                <input
                  className="options-form-input"
                  type="date"
                  value={expires}
                  onChange={(e) => setExpires(e.target.value)}
                />
              </label>
              <div className="options-form-actions">
                <button
                  type="button"
                  className="options-form-btn options-form-btn--cancel"
                  onClick={() => setMode('menu')}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="options-form-btn options-form-btn--submit"
                  disabled={editLoading || !name.trim()}
                >
                  {editLoading ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
