import { useEffect, useState } from 'react'
import { inputProfileNames } from '@lib/utils'
import { useRouter } from 'next/router'
import UploadIcon from '@mui/icons-material/FileUpload'
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
  Alert,
} from '@mui/material'

export default function CreateStudy() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [participantLimit, setParticipantLimit] = useState(1)
  const [inputProfile, setInputProfile] = useState(0)
  const [joystickSensitivity, setJoystickSensitivity] = useState('low')
  const [file, setFile] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const isValidParticipantLimit =
    participantLimit >= 1 && participantLimit <= 500
  const isValid = title && isValidParticipantLimit
  const joystickProfiles = [2, 5, 10, 11, 12, 15]

  useEffect(() => {
    setErrorMessage('')
  }, [
    title,
    description,
    participantLimit,
    inputProfile,
    joystickSensitivity,
    file,
  ])

  async function handleCreateStudy() {
    const formData = new FormData()
    formData.append(
      'body',
      JSON.stringify({
        title,
        description,
        participantLimit,
        inputProfile,
        joystickSensitivity,
      })
    )
    formData.append('song', file)

    await fetch('/api/study', {
      method: 'POST',
      body: formData,
    })
      .then((data) => {
        if (data.status == 201) {
          router.push('/')
        } else {
          setErrorMessage('Something went wrong - unable to create study.')
        }
      })
      .catch((e) => console.error(e))
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          <TextField
            label="Max number of participants"
            variant="outlined"
            type="number"
            value={participantLimit}
            onChange={(e) => setParticipantLimit(e.target.value)}
            sx={{ mr: 3 }}
            inputProps={{ min: 1, max: 500 }}
            error={!isValidParticipantLimit}
            helperText={
              isValidParticipantLimit ? '' : 'Must be between 1 and 500'
            }
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
        </span>
        {file ? (
          <Alert onClose={() => setFile()} style={{ height: '100%' }}>
            <b>MP3: </b>
            {file.name.slice(0, -4)}
          </Alert>
        ) : (
          <FormControl>
            <input
              hidden
              accept=".mp3"
              type="file"
              id="file-upload-button"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file-upload-button">
              <Button
                startIcon={<UploadIcon />}
                variant="contained"
                component="span"
              >
                Upload MP3
              </Button>
            </label>
          </FormControl>
        )}
      </div>
      <Button
        variant="contained"
        onClick={handleCreateStudy}
        disabled={!isValid}
        sx={{ mb: 3 }}
      >
        Create study
      </Button>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  )
}
