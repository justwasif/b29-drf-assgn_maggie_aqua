import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
   getThreads, createThread,
  getComments, createComment
} from './DiscussionApi'
import { getStages } from '../project/proujectapi'
export default function DiscussionPage() {
  const { projectId } = useParams()
  const [stages, setStages] = useState([])
  const [selectedStage, setSelectedStage] = useState(null)
  const [threads, setThreads] = useState([])
  const [selectedThread, setSelectedThread] = useState(null)
  const [comments, setComments] = useState([])
  const [newThreadLoading, setNewThreadLoading] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load stages for this project
  useEffect(() => {
    getStages(projectId)
      .then(s => { setStages(s); if (s.length > 0) setSelectedStage(s[0]) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [projectId])

  // Load threads when stage changes
  useEffect(() => {
    if (!selectedStage) return
    setSelectedThread(null)
    setComments([])
    getThreads(selectedStage.id).then(setThreads).catch(console.error)
  }, [selectedStage])

  // Load comments when thread changes
  useEffect(() => {
    if (!selectedThread) return
    getComments(selectedThread.id).then(setComments).catch(console.error)
  }, [selectedThread])

  const handleCreateThread = async () => {
    if (!selectedStage) return
    setNewThreadLoading(true)
    try {
      const thread = await createThread({ stage: selectedStage.id })
      setThreads(prev => [...prev, thread])
      setSelectedThread(thread)
    } catch (e) {
      alert(e.response?.data?.detail || 'Failed to create thread')
    } finally {
      setNewThreadLoading(false)
    }
  }

  const handleSendComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !selectedThread) return
    setCommentLoading(true)
    try {
      const comment = await createComment({ thread: selectedThread.id, message: newComment })
      setComments(prev => [...prev, comment])
      setNewComment('')
    } catch (e) {
      alert(e.response?.data?.detail || 'Failed to post comment')
    } finally {
      setCommentLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading discussions…</div>

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link to={`/projects/${projectId}`}>Project</Link> / Discussions
      </div>
      <h1>Discussions</h1>

      {stages.length === 0 && (
        <p className="empty">No stages in this project yet. Create stages first to start discussions.</p>
      )}

      {stages.length > 0 && (
        <div className="discussion-layout">
          {/* Stage tabs */}
          <div className="stage-tabs">
            {stages.map(s => (
              <button
                key={s.id}
                className={`stage-tab ${selectedStage?.id === s.id ? 'active' : ''}`}
                onClick={() => setSelectedStage(s)}
              >
                {s.stage}
              </button>
            ))}
          </div>

          <div className="discussion-body">
            {/* Thread list panel */}
            <div className="thread-panel">
              <div className="panel-header">
                <span>Threads</span>
                <button
                  className="btn-sm"
                  onClick={handleCreateThread}
                  disabled={newThreadLoading}
                >
                  {newThreadLoading ? '…' : '+ New Thread'}
                </button>
              </div>
              {threads.length === 0 && (
                <p className="empty-sm">No threads yet. Start one!</p>
              )}
              {threads.map(t => (
                <div
                  key={t.id}
                  className={`thread-item ${selectedThread?.id === t.id ? 'active' : ''}`}
                  onClick={() => setSelectedThread(t)}
                >
                  <span>Thread #{t.id}</span>
                  <span className="thread-meta">{new Date(t.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>

            {/* Comments panel */}
            <div className="comment-panel">
              {!selectedThread && (
                <div className="empty-comments">Select a thread to view comments</div>
              )}
              {selectedThread && (
                <>
                  <div className="panel-header">
                    <span>Thread #{selectedThread.id}</span>
                  </div>
                  <div className="comments-list">
                    {comments.length === 0 && (
                      <p className="empty-sm">No comments yet. Be the first!</p>
                    )}
                    {comments.map(c => (
                      <div key={c.id} className="comment">
                        <div className="comment-meta">User #{c.user} · {new Date(c.created_at).toLocaleString()}</div>
                        <p>{c.message}</p>
                      </div>
                    ))}
                  </div>
                  <form className="comment-form" onSubmit={handleSendComment}>
                    <textarea
                      placeholder="Write a comment…"
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      rows={2}
                      required
                    />
                    <button type="submit" disabled={commentLoading}>
                      {commentLoading ? 'Posting…' : 'Post'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}