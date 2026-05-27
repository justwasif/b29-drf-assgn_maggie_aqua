import axios from "axios"

const API = "http://127.0.0.1:8000/api"

const token = () => {
    return localStorage.getItem("access")
}

export const getProjects = async () => {

    const response = await axios.get(
        `${API}/projects/`,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const createProject = async (data) => {

    const response = await axios.post(
        `${API}/projects/`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const getTasks = async () => {

    const response = await axios.get(
        `${API}/tasks/`,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const createTask = async (data) => {

    const response = await axios.post(
        `${API}/tasks/`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const getStages = async () => {

    const response = await axios.get(
        `${API}/stages/`,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}

export const createStage = async (data) => {

    const response = await axios.post(
        `${API}/stages/`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    )

    return response.data
}