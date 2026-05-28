import axios from 'axios'
 
const BASE = 'http://127.0.0.1:8000/api'
 
const api = axios.create({ baseURL: BASE })
 
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('access')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
 
// Studios
export const getStudios = () => api.get('/studio/').then(r => r.data)
export const createStudio = data => api.post('/studio/', data).then(r => r.data)
export const joinStudio = (studioId, role = ['DESIGNER','CLIENT_VIEWER','ADMIN','PROJECT_LEAD','WRITER']) =>
  api.post('/studiomember/', { studio: studioId, role }).then(r => r.data)
export const getMemberships = () => api.get('/studiomember/').then(r => r.data)
