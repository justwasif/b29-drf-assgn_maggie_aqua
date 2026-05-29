import axios from 'axios'
 
const BASE = 'http://127.0.0.1:8000/api'
 
const api = axios.create({ baseURL: BASE })
 
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('access')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
 
export const getStudios = () => api.get('/studio/').then(r => r.data)
export const createStudio = data => api.post('/studio/', data).then(r => r.data)
export const joinStudio = (studioId) =>
  api.post('/studiomember/', { studio: studioId }).then(r => r.data)

export const getMemberships = () => api.get('/studiomember/').then(r => r.data)
