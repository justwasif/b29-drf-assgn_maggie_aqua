import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

            <div className="page-header">

                <h1>Comments</h1>

                <Link to="/createcomment">
                    <button>Add Comment</button>
                </Link>

            </div>

            {
                comments.map((comment) => (

                    <div key={comment.id} className="card">

                        <h3>Comment #{comment.id}</h3>

                        <p>{comment.message}</p>

                    </div>
                ))
            }

        </div>
    )
}