import axios from "axios"

const APi="http://127.0.0.1:8000/api"

const token=()=>{
    return localStorage.getItem("access")
}
export const getStudios=async()=>{
    const response=await axios.get(`${APi}/studio/`,{
        headers:{
            Authorization:`Bearer ${token()}`
        }
    })
    return response.data
}


export const createStudio=async(data)=>{
    const response=await axios.post(`${APi}/studio/`,data,{
        headers:{
            Authorization:`Bearer ${token()}`
        }
    })
    return response.data
}