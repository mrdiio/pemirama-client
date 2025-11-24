import axios from 'axios'

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
  headers: {
    'Content-Type': 'application/json',
    'x-app-key': 'pemirama2024',
  },
})

export const loginService = async (email, password) => {
  try {
    const res = await authApi.post('/login-mhs', { email, password })
    return res.data
  } catch (error) {
    if (error.response.status === 500) {
      throw new Error('Server error')
    }

    const message =
      error.response.data?.errors?.detail ||
      error.response.data?.message ||
      'Login failed'

    throw new Error(message)
  }
}
