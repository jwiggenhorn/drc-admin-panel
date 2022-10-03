import { useState } from 'react'
import { inputProfileNames, post } from '@lib/utils'
import { useRouter } from 'next/router'
import {
  Button,
  Select,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

export default function CreateStudy() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [participantLimit, setParticipantLimit] = useState(1)
  const [inputProfile, setInputProfile] = useState(0)
  const [joystickSensitivity, setJoystickSensitivity] = useState('low')
  const router = useRouter()
  const isValidParticipantLimit =
    participantLimit >= 1 && participantLimit <= 500
  const isValid = title && isValidParticipantLimit
  const joystickProfiles = [2, 5, 10, 11, 12, 15]

  async function handleCreateStudy() {
    await post('/api/study', {
      title,
      description,
      participantLimit,
      inputProfile,
      joystickSensitivity,
    })
    router.push('/')
  }

  return (
    <div>
      <TextField
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
          value={inputProfile}
          label="Input Profile"
          onChange={(e) => setInputProfile(e.target.value)}
          sx={{ mb: 4, mr: 3 }}
        >
          {[...inputProfileNames].map((value) => (
            <MenuItem key={value} value={value[0]}>
              {value[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {joystickProfiles.includes(inputProfile) && (
        <FormControl>
          <FormLabel>Joystick Sensitivity</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              label="Low"
              value="low"
              control={
                <Radio
                  checked={joystickSensitivity === 'low'}
                  onChange={() => setJoystickSensitivity('low')}
                />
              }
            />
            <FormControlLabel
              label="High"
              value="high"
              control={
                <Radio
                  checked={joystickSensitivity === 'high'}
                  onChange={() => setJoystickSensitivity('high')}
                />
              }
            />
          </RadioGroup>
        </FormControl>
      )}
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
