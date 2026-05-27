import { useEffect, useState } from "react"
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

    }   , [])

    return (
        <div>

            <h1>Discussion Threads</h1>

            {
                threads.map((thread) => (

                    <div key={thread.id}>
                        <p>Stage ID: {thread.stage}</p>
                    </div>

                ))
            }

        </div>
    )
}