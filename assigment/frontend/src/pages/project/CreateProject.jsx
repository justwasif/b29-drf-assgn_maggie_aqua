import { useState } from "react"
import { createProject } from "./proujectapi"
import { useNavigate } from "react-router-dom"

export default function CreateProject() {
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        studio: "",
        title: "",
        description: "",
        lead_by: ""
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

            await createProject(formData)
            navigate("/projectlist")

            console.log("Project Created")

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>

            <h1>Create Project</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    name="studio"
                    placeholder="Studio ID"
                    value={formData.studio}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="lead_by"
                    placeholder="Lead User ID"
                    value={formData.lead_by}
                    onChange={handleChange}
                />

                <button type="submit">
                    Create
                </button>

            </form>

        </div>
    )
}