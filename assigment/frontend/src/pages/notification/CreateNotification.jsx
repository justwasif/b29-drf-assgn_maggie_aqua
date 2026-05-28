import { useState } from "react"
import { createNotification } from "./NotificationApi"
import { useNavigate } from "react-router-dom"

export default function CreateNotification() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        receiver: "",
        title: "",
        message: "",
        type: "",
        task: ""
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

            await createNotification(formData)
            navigate("/notificationlist")

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>

            <h1>Create Notification</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    name="receiver"
                    placeholder="Receiver ID"
                    value={formData.receiver}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="type"
                    placeholder="Type (e.g., info, warning, error)"
                    value={formData.type}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="task"
                    placeholder="Related Task ID (optional)"
                    value={formData.task}
                    onChange={handleChange}
                />

                <button type="submit">Create Notification</button>

            </form>

        </div>
    )
}