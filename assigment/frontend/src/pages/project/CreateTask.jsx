import { useState } from "react"
import { createTask } from "./proujectapi"
import { useNavigate } from "react-router-dom"

export default function CreateTask() {
    const navigation=useNavigate()

    const [formData, setFormData] = useState({
        project: "",
        title: "",
        description: "",
        priority: "",
        deadline: "",
        stage: "",
        assigned_to: ""
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

            await createTask(formData)

            console.log("Task Created")
            navigation('/tasklist')

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>

            <h1>Create Task</h1>

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
                    name="title"
                    placeholder="Task Title"
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
                    type="text"
                    name="priority"
                    placeholder="Priority"
                    value={formData.priority}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="stage"
                    placeholder="Stage ID"
                    value={formData.stage}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="assigned_to"
                    placeholder="Assigned User ID"
                    value={formData.assigned_to}
                    onChange={handleChange}
                />

                <button type="submit">
                    Create
                </button>

            </form>

        </div>
    )
}