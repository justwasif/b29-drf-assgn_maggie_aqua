import { useState, useEffect } from "react"
import { getComments } from "./DiscussionApi"

export default function CommentList() {

    const [comments, setComments] = useState([])

    useEffect(() => {

        const fetchComments = async () => {

            try {

                const data = await getComments()
                setComments(data)

            } catch (error) {

                console.log(error)
            }
        }

        fetchComments()

    }, [])

    return (
        <div>

            <h1>Comments</h1>

            {
                comments.map((comment) => (

                    <div key={comment.id}>
                        <p>Thread ID: {comment.thread}</p>
                        <p>{comment.content}</p>
                    </div>

                ))
            }

        </div>
    )
}