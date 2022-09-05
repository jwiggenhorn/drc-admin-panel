import { useState } from 'react'
import { post } from '@lib/utils'
import useAuth from '@hooks/use-auth'
import { useRouter } from 'next/router'
import { Button, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'

export default function CreateStudy() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [participantLimit, setParticipantLimit] = useState(0)
  const [inputProfile, setInputProfile] = useState(0)
  const { jwt } = useAuth()
  const router = useRouter()
  const {} = useSession({ required: true })

  async function handleCreateStudy() {
    await post('/api/study', jwt, {
      title,
      description,
      participantLimit,
      inputProfile,
    })
    router.push('/')
  }

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        multiline
        fullWidth
        sx={{ mb: 3 }}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        fullWidth
        sx={{ mb: 3 }}
      />
      <TextField
        id="outlined-basic"
        label="Max number of participants"
        variant="outlined"
        type="number"
        value={participantLimit}
        onChange={(e) => setParticipantLimit(e.target.value)}
        sx={{ mr: 3 }}
      />
      <TextField
        id="outlined-basic"
        label="Input profile"
        variant="outlined"
        type="number"
        value={inputProfile}
        onChange={(e) => setInputProfile(e.target.value)}
        sx={{ mb: 4 }}
      />
      <br />
      <Button variant="contained" onClick={handleCreateStudy}>
        Create study
      </Button>
    </div>
  )
}
