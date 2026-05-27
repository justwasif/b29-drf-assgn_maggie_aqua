import { useState } from "react"
import { createStudio } from "./StudioApi"
import { useNavigate } from "react-router-dom"

export default function CreateStudio() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        description: ""
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
            await createStudio(formData)
            navigate("/studios")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Create Studio</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Studio Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <button type="submit">
                    Create
                </button>
            </form>
        </div>
    )
}