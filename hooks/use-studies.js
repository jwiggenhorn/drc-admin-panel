import useSWR, { useSWRConfig } from 'swr'

export default function useStudies(adminName) {
  const endpoint = `/api/studies/${adminName ?? ''}`
  const { data, error } = useSWR(endpoint)
  const { mutate } = useSWRConfig()

  return {
    studies: data,
    isLoading: !error && !data,
    isError: error,
    updateStudies: () => mutate(endpoint),
  }
}
