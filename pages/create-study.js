import { useEffect, useState } from 'react'
import { inputProfileNames, joystickProfiles, uploadFile } from '@lib/utils'
import { useRouter } from 'next/router'
import UploadIcon from '@mui/icons-material/FileUpload'
import LoadingButton from '@mui/lab/LoadingButton'
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
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const isValidParticipantLimit =
    participantLimit >= 1 && participantLimit <= 500
  const isValid = title && isValidParticipantLimit

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
    setIsLoading(true)
    setErrorMessage('')
    if (file) await uploadFile(file)

    const result = await fetch('/api/study', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        participantLimit,
        inputProfile,
        joystickSensitivity,
        songFilename: file?.name,
      }),
    })
    if (result.ok) {
      router.push('/')
    } else {
      setErrorMessage('Something went wrong - unable to create study.')
      setIsLoading(false)
    }
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
        disabled={isLoading}
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
        disabled={isLoading}
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
            disabled={isLoading}
          />
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Input Profile</InputLabel>
            <Select
              value={inputProfile}
              label="Input Profile"
              onChange={(e) => setInputProfile(e.target.value)}
              sx={{ mb: 4, mr: 3 }}
              disabled={isLoading}
            >
              {[...inputProfileNames].map((value) => (
                <MenuItem key={value} value={value[0]}>
                  {value[1]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {joystickProfiles.includes(inputProfile) && (
            <FormControl sx={{ mb: 3 }}>
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </RadioGroup>
            </FormControl>
          )}
        </span>
        {file ? (
          <Alert
            onClose={isLoading ? null : () => setFile()}
            style={{ height: '100%' }}
          >
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
      <LoadingButton
        variant="contained"
        onClick={handleCreateStudy}
        disabled={!isValid}
        sx={{ mb: 3 }}
        loading={isLoading}
      >
        Create study
      </LoadingButton>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  )
}
