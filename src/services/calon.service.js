import apiClient from '@/lib/axios-client'
import { useQuery } from '@tanstack/react-query'

export const useCheckCategoryQuery = () => {
  return useQuery({
    queryKey: ['checkCategory'],
    queryFn: async () => {
      const res = await apiClient.get('/check-category')
      return res.data
    },
  })
}

export const useCalonQuery = (id) => {
  return useQuery({
    queryKey: ['calon', id],
    queryFn: async () => {
      const res = await apiClient.get(`/calon/${id}`)
      return res.data
    },
  })
}
