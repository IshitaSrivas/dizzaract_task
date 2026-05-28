import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchApiKeys, createApiKey } from '../api/keys'
import type { ApiKey } from '../types'
import ApiKeysTable from '../components/ApiKeysTable'
import '../styles/DesktopScreen.scss'

export default function DesktopScreen() {
  const { user } = useAuth()
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
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
    }
  }, [user?.email])

  const handleCreate = async () => {
    setCreating(true)
    setError(null)
    try {
      const newKey = await createApiKey(user?.email)
      setKeys((s) => [newKey, ...s])
    } catch (e) {
      setError('Failed to create API key')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="api-header-block">
      <div className= "api-header">
        <div className= "api-header-title">
          <div className= "api-header-title-text">API keys</div>
          <div className= "api-header-title-subtext">Manage your API keys to access all models</div>
          </div>
        <div className= "api-header-button">
        <button onClick={handleCreate} disabled={creating}>
          {creating ? 'Creating...' : 'Create API key'}
        </button>
        </div>
      </div>

      {error && (
        <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>
      )}

      <div className="api-table-column">
        {loading ? (
          <div className="api-loading">Loading keys…</div>
        ) : (
          <ApiKeysTable keys={keys} />
        )}
      </div>
    </div>
  )
}
