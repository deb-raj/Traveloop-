import axios from 'axios'

// Base URL from .env (VITE_API_URL=http://localhost:8080)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor (e.g., to add auth token later)
axiosInstance.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      config.headers['X-User-Id'] = userId
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor (centralized error logging)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message
    console.error('API Error:', message)
    return Promise.reject(error)
  }
)

export default axiosInstance