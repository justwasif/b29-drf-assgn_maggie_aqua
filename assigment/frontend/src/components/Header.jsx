import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="navbar">
            <h2>Creative Workflow Tracker</h2>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/studios">Studios</Link>
                <Link to="/projectlist">Projects</Link>
                <Link to="/tasklist">Tasks</Link>
                <Link to="/attachmentlist">Attachments</Link>
                <Link to="/notificationlist">Notifications</Link>
                <Link to="/threadlist">Discussions</Link>
            </nav>
        </header>
    )
}