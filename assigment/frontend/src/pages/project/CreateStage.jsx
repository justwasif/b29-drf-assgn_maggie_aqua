import { useState } from "react"
import { createStage } from "./proujectapi"

export default function CreateStage() {
    const navigation=useNavigate()

    const [formData, setFormData] = useState({
        project: "",
        name: "",
        order: ""
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

            await createStage(formData)
            navigation('/stagelist')

            console.log("Stage Created")

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>

            <h1>Create Stage</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    name="project"
                    placeholder="Project ID"
                    value={formData.project}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Stage Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="order"
                    placeholder="Order"
                    value={formData.order}
                    onChange={handleChange}
                />

                <button type="submit">
                    Create
                </button>

            </form>

        </div>
    )
}