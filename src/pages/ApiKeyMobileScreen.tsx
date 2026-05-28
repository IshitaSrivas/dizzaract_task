import React, { useEffect, useState } from 'react'
import { fetchApiKeys, maskApiKey } from '../api/keys'
import '../styles/MobileScreen.scss'
import type { ApiKey } from '../types'
import OptionsPopup from '../components/OptionsPopup'

export default function MobileScreen() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetchApiKeys()
      .then((data) => {
        if (!mounted) return
        setKeys(data)
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const handleDelete = (id: string) => {
    setKeys((s) => s.filter((x) => x.id !== id))
    setOpenMenuId(null)
  }

  const toggleMenu = (id: string) => setOpenMenuId((p) => (p === id ? null : id))

  return (
    <div className="mobile-list">
      {loading ? (
        <div className="mobile-list__loading">Loading…</div>
      ) : (
        keys.map((k) => (
          <div className="api-card" key={k.id}>
            <div className="api-card__row">
              <div className="api-card__info">
                <div className="api-card__title">
                  {k.name}
                  <span className="api-card__masked"> {maskApiKey(k.key)}</span>
                </div>
                <div className="api-card__subtitle">
                  {k.status === 'Expired'
                    ? `Expired • ${k.lastUsed ?? 'used some time ago'}`
                    : `Expires in 29 days, ${k.lastUsed ?? 'never used'}`}
                </div>
              </div>

              <div className="api-card__expired">
                  {k.status === 'Expired' && <div className="expired">Expired</div>}
              </div>
              

              <div className="api-card__actions">
               <OptionsPopup />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
