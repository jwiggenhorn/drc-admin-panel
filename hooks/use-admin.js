import useSWR, { useSWRConfig } from 'swr'
import useAuth from './use-auth'

export default function useAdmin() {
  const endpoint = '/api/admin'
  const { jwt } = useAuth()

  const { data, error } = useSWR([endpoint, jwt])
  const { mutate } = useSWRConfig()

  return {
    studies: data,
    isLoading: !error && !data,
    isError: error,
    updateAdmin: () => mutate([endpoint, jwt]),
  }
}
