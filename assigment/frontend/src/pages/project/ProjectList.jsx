import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProjects, joinProject, getProjectMembers } from './proujectapi'

export default function ProjectList() {
  const { studioId } = useParams()
  const [projects, setProjects] = useState([])
  const [memberOf, setMemberOf] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(null)

  const fetchData = async () => {
    try {
      const all = await getProjects()
      const studioProjects = all.filter(p => String(p.studio) === String(studioId))
      setProjects(studioProjects)

      // check membership for each project
      const memberSets = await Promise.all(
        studioProjects.map(p => getProjectMembers(p.id))
      )
      const currentUserId = JSON.parse(atob(localStorage.getItem('access').split('.')[1])).user_id
      const joined = new Set()
      studioProjects.forEach((p, i) => {
        if (memberSets[i].some(m => m.user === currentUserId)) joined.add(p.id)
      })
      setMemberOf(joined)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [studioId])

  const handleJoin = async (projectId) => {
    setJoining(projectId)
    try {
      await joinProject(projectId)
      await fetchData()
    } catch (e) {
      alert(e.response?.data?.detail || 'Could not join project')
    } finally {
      setJoining(null)
    }
  }

  if (loading) return <div className="loading">Loading projects…</div>

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link to="/studios">Studios</Link> / Projects
      </div>
      <div className="page-header">
        <h1>Projects</h1>
        <Link to={`/studios/${studioId}/projects/create`} className="btn-primary">+ New Project</Link>
      </div>

      {projects.length === 0 && (
        <p className="empty">No projects in this studio yet.</p>
      )}

      <div className="card-grid">
        {projects.map(project => {
          const isMember = memberOf.has(project.id)
          return (
            <div key={project.id} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="card-actions">
                {isMember ? (
                  <Link to={`/projects/${project.id}`} className="btn-primary">
                    Open Project →
                  </Link>
                ) : (
                  <button
                    className="btn-secondary"
                    onClick={() => handleJoin(project.id)}
                    disabled={joining === project.id}
                  >
                    {joining === project.id ? 'Joining…' : 'Join Project'}
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