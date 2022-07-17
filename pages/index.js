import { useState } from 'react'
import Link from 'next/link'
import useStudies from '../hooks/use-studies'
import { post } from '../lib/utils'

export default function Home() {
  const user = 'Dr. Coan'
  const { studies, isLoading, isError, updateStudies } = useStudies(user)
  const [studyName, setStudyName] = useState('')

  async function handleCreateStudy() {
    await post('/api/studies', {
      name: studyName,
      admin: user,
    })
    await updateStudies()
    setStudyName('')
  }

  if (isLoading) return <h1>Loading</h1>
  else
    return (
      <div>
        <h1>{user}'s Studies</h1>
        {studies?.map((study) => (
          <div key={study._id} style={{ border: '1px solid black' }}>
            <h3>Study: {study.name}</h3>
            <h3>Key: {study.key}</h3>
          </div>
        ))}
        {studies?.length === 0 && <p>No studies found.</p>}

        <label>
          Study name:
          <input
            type="text"
            value={studyName}
            onChange={(e) => setStudyName(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleCreateStudy}>Create study</button>

        {isError && <h1 style={{ color: 'red' }}>Something went wrong!!</h1>}

        <br />
        <br />
        <br />

        <Link href="/tutorial">
          <button>Go to Next.js Tutorial Page</button>
        </Link>
      </div>
    )
}
