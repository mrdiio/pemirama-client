import apiClient from '@/lib/axios-client'
import { useQuery } from '@tanstack/react-query'

export const useCheckFotoQuery = () => {
  return useQuery({
    queryKey: ['check-foto'],
    queryFn: async () => {
      const res = await apiClient.get('/check-foto')
      return res.data
    },
  })
}

export const useInfoQuery = () => {
  return useQuery({
    queryKey: ['info'],
    queryFn: async () => {
      const res = await apiClient.get('/info')
      return res.data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const checkFotoService = async (token) => {
  const res = await apiClient.get('/check-foto', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

export const uploadImageService = async (file) => {
  const formData = new FormData()
  const blob = await fetch(file).then((r) => r.blob())
  formData.append('image', blob, 'image.jpg')

  const res = await apiClient.post('/upload-voter-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

export const storeVoteService = async (data) => {
  const res = await apiClient.post('/vote', data)

  return res.data
}
