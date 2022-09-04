import useSWR from 'swr'
import useAuth from './use-auth'

export default function useStudy(id) {
  const endpoint = `/api/study?id=${id}`
  const { jwt } = useAuth()
  const { data, error } = useSWR([endpoint, jwt])

  return {
    study: data?.study,
    participantData: data?.data,
    isLoading: !error && !data,
    isError: error,
  }
}
