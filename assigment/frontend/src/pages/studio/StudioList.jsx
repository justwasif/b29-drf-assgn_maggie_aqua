import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStudios, joinStudio, getMemberships } from './StudioApi'

export default function StudioList() {
  const [studios, setStudios] = useState([])
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(null)

  useEffect(() => {
    Promise.all([getStudios(), getMemberships()])
      .then(([s, m]) => { setStudios(s); setMemberships(m) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const joinedStudioIds = new Set(memberships.map(m => m.studio))

  const handleJoin = async (studioId) => {
    setJoining(studioId)
    try {
      await joinStudio(studioId)
      const m = await getMemberships()
      setMemberships(m)
    } catch (e) {
      alert(e.response?.data?.detail || 'Could not join studio')
    } finally {
      setJoining(null)
    }
  }

  if (loading) return <div className="loading">Loading studios…</div>

  return (
    <div className="page">
      <div className="page-header">
        <h1>Studios</h1>
        <Link to="/studios/create" className="btn-primary">+ New Studio</Link>
      </div>

      {studios.length === 0 && (
        <p className="empty">No studios yet. Create the first one!</p>
      )}

      <div className="card-grid">
        {studios.map(studio => {
          const isMember = joinedStudioIds.has(studio.id)
          return (
            <div key={studio.id} className="card">
              <h3>{studio.name}</h3>
              <p>{studio.description}</p>
              <div className="card-actions">
                {isMember ? (
                  <Link to={`/studios/${studio.id}/projects`} className="btn-primary">
                    View Projects →
                  </Link>
                ) : (
                  <button
                    className="btn-secondary"
                    onClick={() => handleJoin(studio.id)}
                    disabled={joining === studio.id}
                  >
                    {joining === studio.id ? 'Joining…' : 'Join Studio'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}