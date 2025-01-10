import apiClient from '@/lib/axios-client'
import { useQuery } from '@tanstack/react-query'

export const useCheckFotoQuery = () => {
  return useQuery({
    queryKey: ['check-foto'],
    queryFn: async () => {
      const res = await apiClient.get('/check-foto')
      return res.data
    },

    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
  })
}

export const uploadImageService = async (file) => {
  const formData = new FormData()
  const blob = await fetch(file).then((r) => r.blob())
  formData.append('image', blob, 'image.jpg')

  const res = apiClient.post('/upload-voter-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

export const storeVoteService = async (data) => {
  const res = apiClient.post('/vote', data)

  return res.data
}
