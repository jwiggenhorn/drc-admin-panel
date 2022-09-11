import { useState } from 'react'
import { post } from '@lib/utils'
import { useRouter } from 'next/router'
import { Button, Select, TextField } from '@mui/material'
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';

export default function CreateStudy() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [participantLimit, setParticipantLimit] = useState(1)
  const [inputProfile, setInputProfile] = useState(0)
  const router = useRouter()
  const isValidParticipantLimit =
    participantLimit >= 1 && participantLimit <= 500
  const isValidInputProfile = inputProfile >= 0 && inputProfile <= 16
  const isValid = title && isValidParticipantLimit && isValidInputProfile

  async function handleCreateStudy() {
    await post('/api/study', {
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
        label="Description (optional)"
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
        inputProps={{ min: 1, max: 500 }}
        error={!isValidParticipantLimit}
        helperText={isValidParticipantLimit ? '' : 'Must be between 1 and 500'}
      />
      <FormControl>
        <InputLabel id="outlined-basic">Input Profile</InputLabel>
        <Select
          labelId="outlined-basic-label"
          id="outlined-basic"
          type="number"
          value={inputProfile}
          label="Input Profile"
          onChange={(e) => setParticipantLimit(e.target.value)}
          sx={{ mb: 4 }}
          inputProps={{ min: 0, max: 16 }}
          error={!isValidInputProfile}
          helperText={isValidInputProfile ? '' : 'Must be between 0 and 16'}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={16}>16</option>
        </Select>
      </FormControl>
      <br />
      <Button
        variant="contained"
        onClick={handleCreateStudy}
        disabled={!isValid}
      >
        Create study
      </Button>
    </div>
  )
}
