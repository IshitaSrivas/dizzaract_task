import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchApiKeys, createApiKey, editApiKey, deleteApiKey, disableApiKey } from '../api/keys'
import type { ApiKey } from '../types'
import ApiKeysTable from '../components/ApiKeysTable'
import KeyFormModal from '../components/KeyFormModal'
import SuccessPopup from '../components/SuccessPopup'
import { DesktopApiKeysSkeleton } from '../components/Skeleton'
import '../styles/DesktopScreen.scss'
import add from '../assets/add.svg'

export default function DesktopScreen() {
  const { user } = useAuth()
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [successInfo, setSuccessInfo] = useState<{
    message: string
    copyValue?: string
    copyLabel?: string
  } | null>(null)

  useEffect(() => {
    let mounted = true
    fetchApiKeys(user?.email)
      .then((data) => {
        if (!mounted) return
        setKeys(data)
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setError('Failed to load API keys')
        setLoading(false)
      })
    return () => {
      mounted = false
      setLoading(true)
      setKeys([])
    }
  }, [user?.email])

  const handleCreate = async (name: string, expires: string) => {
    const newKey = await createApiKey(user?.email, name, expires)
    setKeys((s) => [newKey, ...s])
    setShowCreateForm(false)
    setSuccessInfo({
      message: "API key created successfully! Copy your key — it won't be shown again.",
      copyValue: newKey.key,
      copyLabel: 'Copy key',
    })
  }

  const handleEdit = async (id: string, name: string, expires: string) => {
    const updated = await editApiKey(id, name, expires)
    setKeys((s) => s.map((k) => (k.id === id ? updated : k)))
    setSuccessInfo({
      message: 'API key updated successfully!',
      copyValue: name,
      copyLabel: 'Copy name',
    })
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
    <div className="api-header-block">
      <div className="api-header">
        <div className="api-header-title">
          <div className="api-header-title-text">API keys</div>
          <div className="api-header-title-subtext">Manage your API keys to access all models</div>
        </div>
        <div className="api-header-button">
          <button onClick={() => setShowCreateForm(true)}>
            <img src={add} alt="Add" />
            <span>Create API key</span>
          </button>
        </div>
      </div>

      {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}

      <div className="api-table-column">
        {loading ? (
          <DesktopApiKeysSkeleton />
        ) : (
          <ApiKeysTable
            keys={keys}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDisable={handleDisable}
          />
        )}
      </div>

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
