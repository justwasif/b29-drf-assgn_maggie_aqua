import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://127.0.0.1:8000'

export default function Signup() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'designer',
  })

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setStatus({
      loading: true,
      error: null,
      success: false
    })

    try {

      const res = await axios.post(
        `${API_BASE}/api/users/register/`,
        formData
      )

      if (res.status === 201 || res.status === 200) {

        setStatus({
          loading: false,
          error: null,
          success: true
        })

        setTimeout(() => {
          navigate('/login', { replace: true })
        }, 1500)

      }

    } catch (err) {

      const data = err.response?.data

      const firstKey = data ? Object.keys(data)[0] : null

      const errorMsg =
        Array.isArray(data?.[firstKey])
          ? data[firstKey][0]
          : data?.detail ||
            'Registration failed'

      setStatus({
        loading: false,
        error: errorMsg,
        success: false
      })

    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24 }}>

      <h2>Sign Up</h2>

      {status.error && (
        <p style={{ color: 'red', marginBottom: 12 }}>
          {status.error}
        </p>
      )}

      {status.success && (
        <p style={{ color: 'green', marginBottom: 12 }}>
          Registration successful! Redirecting to login…
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: 12 }}>
          <label>Username</label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              marginTop: 4,
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              marginTop: 4,
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              marginTop: 4,
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Role</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              display: 'block',
              width: '100%',
              padding: 8,
              marginTop: 4,
              boxSizing: 'border-box'
            }}
          >
            <option value="admin">Admin</option>
            <option value="project_lead">Project Lead</option>
            <option value="designer">Designer</option>
            <option value="writer">Writer</option>
            <option value="reviewer">Reviewer</option>
            <option value="client">Client</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          style={{
            padding: '8px 20px',
            marginRight: 10
          }}
        >
          {status.loading ? 'Signing up…' : 'Sign Up'}
        </button>

        <span>Already have an account? </span>

        <Link to="/login">
          Login
        </Link>

      </form>
    </div>
  )
}