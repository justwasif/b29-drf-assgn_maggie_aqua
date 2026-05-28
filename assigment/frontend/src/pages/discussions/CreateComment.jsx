import { useState } from "react"
import { createComment } from "./DiscussionApi"
import { useNavigate } from "react-router-dom"

export default function CreateComment() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        thread: "",
        message: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await createComment(formData)
            navigate("/commentlist")

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>

            <h1>Create Comment</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    name="thread"
                    placeholder="Thread ID"
                    value={formData.thread}
                    onChange={handleChange}
                />

                <textarea
                    name="message"
                    placeholder="Comment Message"
                    value={formData.message}
                    onChange={handleChange}
                />

                <button type="submit">Add Comment</button>

            </form>

        </div>
    )
}