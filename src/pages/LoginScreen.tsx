import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginScreen() {
  const { signIn } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (field: 'email' | 'password') => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setError('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const success = await signIn(form)
    if (!success) {
      setError('Invalid email or password.')
    }
    setLoading(false)
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <span className="badge">Welcome back</span>
          <h1>Sign in</h1>
          <p>Securely log in to access your dashboard.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              placeholder="••••••••"
              required
            />
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Continue'}
          </button>
        </form>
      </section>
    </main>
  )
}
