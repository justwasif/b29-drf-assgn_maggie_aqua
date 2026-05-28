import { useState } from "react"
import { createThread } from "./DiscussionApi"
import { useNavigate } from "react-router-dom"

export default function CreateThread() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        stage: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            stage : e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await createThread(formData)
            navigate("/threadlist")

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>

            <h1>Create Thread</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    placeholder="Stage ID"
                    value={formData.stage}
                    onChange={handleChange}
                />
                <button type="submit">Create Thread</button>

            </form>

        </div>
    )
}