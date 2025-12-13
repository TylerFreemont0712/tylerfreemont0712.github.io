import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const downloadAPI = {
  create: async (downloadData) => {
    const response = await api.post('/api/downloads/', downloadData)
    return response.data
  },

  getStatus: async (downloadId) => {
    const response = await api.get(`/api/downloads/${downloadId}`)
    return response.data
  },

  list: async () => {
    const response = await api.get('/api/downloads/')
    return response.data
  },

  cancel: async (downloadId) => {
    const response = await api.delete(`/api/downloads/${downloadId}`)
    return response.data
  },
}

export const createWebSocket = (downloadId) => {
  const wsUrl = API_BASE_URL.replace('http', 'ws')
  return new WebSocket(`${wsUrl}/api/downloads/ws/${downloadId}`)
}

export default api
