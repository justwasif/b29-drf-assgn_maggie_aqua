import axios from 'axios'
 
const BASE = 'http://127.0.0.1:8000/api'
 
const api = axios.create({ baseURL: BASE })
 
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('access')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const getProjects = () => api.get('/projects/').then(r => r.data)
export const createProject = data => api.post('/projects/', data).then(r => r.data)
export const joinProject = (projectId, role = ['DESIGNER','CLIENT_VIEWER','ADMIN','PROJECT_LEAD','WRITER']) =>
  api.post('/projectmembers/', { project: projectId, role }).then(r => r.data)
export const getProjectMembers = projectId =>
  api.get(`/projectmembers/?project=${projectId}`).then(r => r.data)
export const getTasks = projectId =>
  api.get(`/tasks/?project=${projectId}`).then(r => r.data)
export const createTask = data => api.post('/tasks/', data).then(r => r.data)
export const getStages = projectId =>
  api.get(`/stages/?project=${projectId}`).then(r => r.data)
export const createStage = data => api.post('/stages/', data).then(r => r.data)

