import type { ApiKeysTableProps } from '../types'
import { maskApiKey } from '../api/keys'
import OptionsPopup from './OptionsPopup'
import options from '../assets/options.svg'
import { useState } from 'react'

export default function ApiKeysTable({ keys }: ApiKeysTableProps) {

  const [active, setActive] = useState(false)
  return (

      <table className="api-table">
          <thead>
            <tr>
              <th className="api-cell">Name</th>
              <th className="api-cell">API key</th>
              <th className="api-cell">Status</th>
              <th className="api-cell">Expires</th>
              <th className="api-cell">Created</th>
              <th className="api-cell">Last used</th>
              <th className="api-cell"></th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.id} className="api-row">
                <td className="api-cell td">{k.name}</td>
                <td className="api-cell td">{maskApiKey(k.key)}</td>
                <td className="api-cell td">
                  <div className={`api-cell-inner-item td ${k.status === 'Expired' ? 'exp' : 'active'}`}>
                    {k.status}
                  </div>
                </td>
                <td className="api-cell td">{k.expires}</td>
                <td className="api-cell td">{k.createdAt}</td>
                <td className="api-cell td">{k.lastUsed ?? '-'}</td>
                <td className="api-cell td options">
                  <OptionsPopup />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
}
