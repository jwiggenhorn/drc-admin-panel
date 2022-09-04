import { useState } from 'react'
import { post } from '@lib/utils'
import useAuth from '@hooks/use-auth'
import { useRouter } from 'next/router'

export default function CreateStudy() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [participantLimit, setParticipantLimit] = useState(0)
  const [inputProfile, setInputProfile] = useState(0)
  const { jwt } = useAuth()
  const router = useRouter()

  async function handleCreateStudy() {
    await post('/api/study', jwt, {
      title,
      description,
      participantLimit,
    })
    router.push('/')
  }

  return (
    <div>
      <br />
      <br />
      <br />

      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Number of participants:
        <input
          type="number"
          value={participantLimit}
          onChange={(e) => setParticipantLimit(e.target.value)}
        />
      </label>
      <br />
      <label>
        Input profile:
        <input
          type="number"
          value={inputProfile}
          onChange={(e) => setInputProfile(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleCreateStudy}>Create study</button>
    </div>
  )
}
