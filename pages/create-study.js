import { useState } from 'react'
import { post } from '@lib/utils'
import { useRouter } from 'next/router'
import { Button, Select, TextField } from '@mui/material'
import { InputLabel, FormControl, MenuItem } from '@mui/material'

export default function CreateStudy() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [participantLimit, setParticipantLimit] = useState(1)
  const [inputProfile, setInputProfile] = useState(0)
  const router = useRouter()
  const isValidParticipantLimit =
    participantLimit >= 1 && participantLimit <= 500
  const isValidInputProfile = inputProfile >= 0
  const isValid = title && isValidParticipantLimit

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
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel>Input Profile</InputLabel>
        <Select
          type="number"
          value={inputProfile}
          label="Input Profile"
          onChange={(e) => setInputProfile(e.target.value)}
          sx={{ mb: 4 }}
        >
          <MenuItem value={0}>V. Slider</MenuItem>
          <MenuItem value={1}>H. Slider</MenuItem>
          <MenuItem value={2}>Joystick</MenuItem>
          <MenuItem value={3}>Toggle</MenuItem>
          <MenuItem value={4}>H. Slider + V. Slider</MenuItem>
          <MenuItem value={5}>Joystick + V. Slider</MenuItem>
          <MenuItem value={6}>Button</MenuItem>
          <MenuItem value={7}>2 Buttons</MenuItem>
          <MenuItem value={8}>3 Buttons</MenuItem>
          <MenuItem value={9}>V. Slider + Button</MenuItem>
          <MenuItem value={10}>Joystick + Button</MenuItem>
          <MenuItem value={11}>V. Slider + Joystick</MenuItem>
          <MenuItem value={12}>H. Slider + Joystick</MenuItem>
          <MenuItem value={13}>Toggle + V. Slider</MenuItem>
          <MenuItem value={14}>Toggle + H. Slider</MenuItem>
          <MenuItem value={15}>Toggle + Joystick</MenuItem>
          <MenuItem value={16}>3 Toggles</MenuItem>
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
