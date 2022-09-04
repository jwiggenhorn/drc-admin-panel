import { useRouter } from 'next/router'
import useStudy from '@hooks/use-study'
import { post } from '@lib/utils'

export default function Home() {
  const router = useRouter()
  const { id } = router.query
  const { study, isLoading, isError } = useStudy(id)

  if (isLoading) return <h1>Loading...</h1> // TODO: add Spinner
  else
    return (
      <div>
        <br />
        <br />
        <br />

        <h3>Study: {study?.title}</h3>
        <p>Description: {study?.description}</p>
        <h3>Key: {study?.key}</h3>
        <h3>Participant Limit: {study?.participantLimit}</h3>
        <h3>Input profile: {study?.inputProfile}</h3>
        <h3>Data: {study?.data}</h3>

        {study?.data.length == 0 && (
          <button
            onClick={() => {
              post(`http://localhost:3000/api/study/${study?.key}`, '')
            }}
          >
            generate test data
          </button>
        )}

        {isError && <h1 style={{ color: 'red' }}>Something went wrong!!</h1>}
      </div>
    )
}
