import useSWR, { useSWRConfig } from 'swr'

export default function useAdmin() {
  const endpoint = '/api/admin'

  const { data, error } = useSWR(endpoint)
  const { mutate } = useSWRConfig()

  return {
    studies: data,
    isLoading: !error && !data,
    isError: error,
    updateAdmin: () => mutate(endpoint),
  }
}
