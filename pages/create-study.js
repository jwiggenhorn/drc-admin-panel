import { useState } from 'react'
import { post } from '@lib/utils'
import { useRouter } from 'next/router'
import { Button, Select, TextField } from '@mui/material'
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { MenuItem } from '@mui/material';

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
      <FormControl style={{minWidth: 120}}>
        <InputLabel id="outlined-basic">Input Profile</InputLabel>
        <Select
          labelId="outlined-basic-label"
          id="outlined-basic"
          type="number"
          defaultValue={0}
          value={inputProfile}
          label="Input Profile"
          onChange={(e) => setInputProfile(e.target.value)}
          sx={{ mb: 4 }}
          inputProps={{ min: 0, max: 16 }}
          error={!isValidInputProfile}
          helperText={isValidInputProfile ? '' : 'Must be between 0 and 16'}
        >
         
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
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
