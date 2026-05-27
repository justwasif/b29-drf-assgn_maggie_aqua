import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API_BASE = 'http://127.0.0.1:8000'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || data.email?.[0] || 'Login failed')
      }
     
      localStorage.setItem('accessToken', data.access)
      localStorage.setItem('refreshToken', data.refresh)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24 }}>
      <h2>Login</h2>
      {error && (
        <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '8px 20px', marginRight: 10 }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <span>Don't have an account? </span>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  )
}