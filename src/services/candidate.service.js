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

export const useCandidateQuery = (id) => {
  return useQuery({
    queryKey: ['candidates', id],
    queryFn: async () => {
      const res = await apiClient.get(`/candidates/${id}`)
      return res.data
    },
  })
}
