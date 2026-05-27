import axios from "axios"

const API = "http://127.0.0.1:8000/api"

const token = () => {
    return localStorage.getItem("access")
}

export const getAttachments = async () => {

    const response = await axios.get(
        `${API}/attachments/`,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const createAttachment = async (formData) => {

    const response = await axios.post(
        `${API}/attachments/`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
                "Content-Type": "multipart/form-data"
            }
        }
    )

    return response.data
}