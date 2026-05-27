import axios from "axios"

const API = "http://127.0.0.1:8000/api"

const token = () => {
    return localStorage.getItem("access")
}

export const getNotifications = async () => {

    const response = await axios.get(
        `${API}/notifications/`,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const createNotification = async (data) => {

    const response = await axios.post(
        `${API}/notifications/`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}