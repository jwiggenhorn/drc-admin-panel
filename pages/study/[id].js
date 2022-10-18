import { useState } from 'react'
import { useRouter } from 'next/router'
import useStudy from '@hooks/use-study'
import {
  inputProfileNames,
  generateDataForChart,
  chartOptions,
  exportAsCSV,
} from '@lib/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import ExportIcon from '@mui/icons-material/IosShare'
import {
  Button,
  CircularProgress,
  Alert,
  Divider,
  TextField,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material'
import {
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'

export default function StudyDetails() {
  const router = useRouter()
  const { id } = router.query
  const { study, isLoading, isError, participantData } = useStudy(id)
  const [selectedParticipant, setSelectedParticipant] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  async function handleDelete() {
    const result = await fetch(`/api/study/${id}`, {
      method: 'DELETE',
    })
    if (result.ok) {
      router.push('/')
    } else {
      setErrorMessage('Something went wrong - unable to delete study.')
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 6 }}>
        <CircularProgress size={350} thickness={2.5} />
      </Box>
    )
  } else if (isError) {
    return <Alert severity="error">Error fetching study data</Alert>
  } else {
    Chart.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
    return (
      <div>
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>{study?.title}</h1>
          <IconButton onClick={() => setOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </span>
        <Divider />
        {study?.description && (
          <p>
            <b>Description:</b> {study?.description}
          </p>
        )}
        <p>
          <b>Key:</b> {study?.key}
        </p>
        <p>
          <b>Participant Limit:</b> {study?.participantLimit}
        </p>
        <p>
          <b>Input profile:</b> {inputProfileNames.get(study?.inputProfile)}
        </p>
        <Divider />
        {participantData.length > 0 ? (
          <>
            <span style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                label="Selected Participant"
                variant="outlined"
                type="number"
                value={selectedParticipant + 1}
                onChange={(e) => {
                  if (
                    e.target.value - 1 >= 0 &&
                    e.target.value - 1 < participantData.length
                  )
                    setSelectedParticipant(e.target.value - 1)
                }}
                sx={{ mt: 3, minWidth: 200 }}
                inputProps={{ min: 1, max: participantData?.length ?? 1 }}
                helperText={`${selectedParticipant + 1} of ${
                  participantData?.length
                }`}
              />
              <Button
                onClick={() => {
                  exportAsCSV(participantData, study.inputProfile, study.title)
                }}
                startIcon={<ExportIcon />}
              >
                Export as csv
              </Button>
            </span>
            <Scatter
              options={chartOptions}
              data={generateDataForChart(participantData, selectedParticipant)}
            />
          </>
        ) : (
          <Alert severity="info" sx={{ my: 3 }}>
            No participant data
          </Alert>
        )}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>
            Delete <b>{study?.title}</b>?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action cannot be undone. Please type the name of the study to
              confirm.
            </DialogContentText>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ my: 2 }}
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                disabled={name !== study?.title}
                onClick={handleDelete}
              >
                Submit
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
