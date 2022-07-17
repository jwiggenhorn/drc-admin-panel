import Tutorial from '../components/tutorial'
import useStudies from '../hooks/use-studies'
import { post } from '../lib/utils'

export default function Home() {
  const { studies, isLoading, isError } = useStudies('Dr. Coan')

  return (
    <div>
      {isLoading && 'Loading...'}
      {isError && 'ERROR!'}

      <br />

      {studies?.map((study) => (
        <div key={study._id}>
          <h1>Study: {study.name}</h1>
          <h2>Key: {study.key}</h2>
        </div>
      ))}

      <button
        onClick={() =>
          post('/api/study', {
            name: 'Test Study',
            admin: 'Dr. Coan',
            key: 'test key',
          })
        }
      >
        Test POST
      </button>

      <Tutorial />
    </div>
  )
}
