import { useState } from "react"
import { createAttachment } from "./taskapi"
import { useNavigate } from "react-router-dom"

export default function CreateAttachment() {
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        task: "",
        description: "",
        file_url: ""
    })

    const handleChange = (e) => {

        if (e.target.name === "file_url") {

            setFormData({
                ...formData,
                file_url: e.target.files[0]
            })

        } else {

            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await createAttachment(formData)

            console.log("Attachment Uploaded")
            navigate("/attachmentlist")

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>

            <h1>Upload Attachment</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    name="task"
                    placeholder="Task ID"
                    value={formData.task}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="file_url"
                    placeholder="Paste file url"
                    
                    onChange={handleChange}
                />

                <button type="submit">
                    Upload
                </button>

            </form>

        </div>
    )
}