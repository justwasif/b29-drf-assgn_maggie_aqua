import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <div className="homepage">
            <h1>Creative Workflow Tracker</h1>
            <p>Manage projects, tasks, discussions, attachments and notifications.</p>

            <div className="card-grid">
                <Link to="/studios" className="card">Studios</Link>
                <Link to="/projectlist" className="card">Projects</Link>
                <Link to="/tasklist" className="card">Tasks</Link>
                <Link to="/attachmentlist" className="card">Attachments</Link>
                <Link to="/notificationlist" className="card">Notifications</Link>
                <Link to="/threadlist" className="card">Discussions</Link>
            </div>
        </div>
    )
}