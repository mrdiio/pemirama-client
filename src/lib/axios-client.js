import axios from 'axios'
import { getSession } from 'next-auth/react'

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-app-key': 'pemirama2024',
  },
})

// add axios interceptor and set token to header from cookie
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getSession()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
