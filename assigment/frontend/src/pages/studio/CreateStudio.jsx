import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStudio } from './StudioApi'

export default function CreateStudio() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', description: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createStudio(form)
      navigate('/studios')
    } catch (e) {
      setError(e.response?.data?.detail || JSON.stringify(e.response?.data) || 'Failed to create studio')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page-narrow">
      <div className="page-header">
        <h1>Create Studio</h1>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <form className="form-card" onSubmit={handleSubmit}>
        <label>Studio Name</label>
        <input
          type="text"
          placeholder="e.g. Moonshot Creative"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <label>Description</label>
        <textarea
          placeholder="What does this studio work on?"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Create Studio'}
        </button>
      </form>
    </div>
  )
}