import useSWR from 'swr'

export default function useStudy(id) {
  const endpoint = `/api/study?id=${id}`
  const { data, error } = useSWR(endpoint)

  return {
    study: data?.study,
    participantData: data?.data,
    isLoading: !error && !data,
    isError: error,
  }
}
