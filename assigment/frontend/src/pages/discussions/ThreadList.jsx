import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getThreads } from "./DiscussionApi"

export default function ThreadList() {

    const [threads, setThreads] = useState([])

    useEffect(() => {

        const fetchThreads = async () => {

            try {

                const data = await getThreads()
                setThreads(data)

            } catch (error) {

                console.log(error)
            }
        }

        fetchThreads()

    }, [])

    return (
        <div>

            <div className="page-header">

                <h1>Discussion Threads</h1>

                <Link to="/createthread">
                    <button>Create Thread</button>
                </Link>

            </div>

            {
                threads.map((thread) => (

                    <div key={thread.id} className="card">

                        <h3>Thread #{thread.id}</h3>

                        <p>Stage ID: {thread.stage}</p>

                        <div style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "12px"
                        }}>

                            <Link to="/commentlist">
                                <button>View Comments</button>
                            </Link>

                            <Link to="/createcomment">
                                <button>Add Comment</button>
                            </Link>

                        </div>

                    </div>
                ))
            }

        </div>
    )
}