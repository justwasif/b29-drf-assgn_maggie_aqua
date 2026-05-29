import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStudios, joinStudio, getMemberships } from './StudioApi'

export default function StudioList() {
  const navigate = useNavigate()
  const [studios, setStudios] = useState([])
  const [joinedIds, setJoinedIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(null)

  useEffect(() => {
    Promise.all([getStudios(), getMemberships()])
      .then(([s, m]) => {
        setStudios(s)
        setJoinedIds(new Set(m.map(x => x.studio)))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleJoin = async (studioId) => {
    setJoining(studioId)
    try {
      await joinStudio(studioId)
      navigate(`/studios/${studioId}/projects`)
    } catch (e) {
      if (e.response?.status === 400) {
        navigate(`/studios/${studioId}/projects`)
      } else {
        alert(e.response?.data?.detail || 'Could not join studio')
      }
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
          const isMember = joinedIds.has(studio.id)
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