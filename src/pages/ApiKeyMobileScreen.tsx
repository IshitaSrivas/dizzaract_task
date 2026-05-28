import { useEffect, useState } from 'react'
import { fetchApiKeys, maskApiKey, createApiKey, editApiKey, deleteApiKey, disableApiKey } from '../api/keys'
import '../styles/MobileScreen.scss'
import type { ApiKey } from '../types'
import OptionsPopup from '../components/OptionsPopup'
import KeyFormModal from '../components/KeyFormModal'
import SuccessPopup from '../components/SuccessPopup'
import { MobileApiKeysSkeleton } from '../components/Skeleton'

export default function MobileScreen() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [successInfo, setSuccessInfo] = useState<{ message: string; copyValue?: string; copyLabel?: string } | null>(null)

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

  const handleCreate = async (name: string, expires: string) => {
    const newKey = await createApiKey(undefined, name, expires)
    setKeys((s) => [newKey, ...s])
    setShowCreateForm(false)
    setSuccessInfo({
      message: 'API key created successfully! Copy your key — it won\'t be shown again.',
      copyValue: newKey.key,
      copyLabel: 'Copy key',
    })
  }

  const handleEdit = async (id: string, name: string, expires: string) => {
    const updated = await editApiKey(id, name, expires)
    setKeys((s) => s.map((k) => (k.id === id ? updated : k)))
    setSuccessInfo({ message: 'API key updated successfully!', copyValue: name, copyLabel: 'Copy name' })
  }

  const handleDelete = async (id: string) => {
    await deleteApiKey(id)
    setKeys((s) => s.filter((k) => k.id !== id))
    setSuccessInfo({ message: 'API key deleted successfully.' })
  }

  const handleDisable = async (id: string) => {
    const updated = await disableApiKey(id)
    setKeys((s) => s.map((k) => (k.id === id ? updated : k)))
    setSuccessInfo({ message: 'API key disabled successfully.' })
  }

  return (
    <div className="mobile-list">
      <div className="mobile-list__header">
        <button className="mobile-create-btn" onClick={() => setShowCreateForm(true)}>+ Create API key</button>
      </div>

      {loading ? (
        <MobileApiKeysSkeleton />
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
                <OptionsPopup keyData={k} onEdit={handleEdit} onDelete={handleDelete} onDisable={handleDisable} />
              </div>
            </div>
          </div>
        ))
      )}

      {showCreateForm && (
        <KeyFormModal
          mode="create"
          onSubmit={handleCreate}
          onClose={() => setShowCreateForm(false)}
        />
      )}

      {successInfo && (
        <SuccessPopup
          message={successInfo.message}
          copyValue={successInfo.copyValue}
          copyLabel={successInfo.copyLabel}
          onClose={() => setSuccessInfo(null)}
        />
      )}
    </div>
  )
}
