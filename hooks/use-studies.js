import useSWR from 'swr'

export default function useStudies(adminName) {
  const { data, error } = useSWR(`/api/studies/${adminName ?? ''}`)

  return {
    studies: data,
    isLoading: !error && !data,
    isError: error,
  }
}
