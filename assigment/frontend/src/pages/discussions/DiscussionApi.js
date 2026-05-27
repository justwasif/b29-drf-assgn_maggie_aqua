import axios from "axios"

const API = "http://127.0.0.1:8000/api"

const token = () => {
    return localStorage.getItem("access")
}

export const getThreads = async () => {
    const response = await axios.get(
        `${API}/threads/`,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const createThread = async (data) => {
    const response = await axios.post(
        `${API}/threads/`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const getComments = async () => {
    const response = await axios.get(
        `${API}/comments/`,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const createComment = async (data) => {
    const response = await axios.post(
        `${API}/comments/`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}   