import { useState } from "react"
import { createMembership } from "./StudioApi"
import { useNavigate } from "react-router-dom"

export default function CreateMembership() {
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        user: "",
        studio: "",
        role: ""
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

            await createMembership(formData)
            navigate('/membership')
            

            console.log("Membership Created")

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>

            <h1>Create Membership</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    name="user"
                    placeholder="User ID"
                    value={formData.user}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="studio"
                    placeholder="Studio ID"
                    value={formData.studio}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Role
                    </option>

                    <option value="designer">
                        Designer
                    </option>

                    <option value="writer">
                        Writer
                    </option>

                    <option value="reviewer">
                        Reviewer
                    </option>

                    <option value="client">
                        Client
                    </option>

                </select>

                <button type="submit">
                    Create
                </button>

            </form>

        </div>
    )
}