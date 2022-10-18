import { React, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import useStudy from '@hooks/use-study'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  inputProfileNames,
  generateDataForChart,
  chartOptions,
  exportAsCSV,
} from '@lib/utils'
import { Box } from '@mui/system'
import { ExportIcon } from '@mui/icons-material/IosShare'
import Box2 from '@mui/material/Box';
import {
  Button,
  CircularProgress,
  Alert,
  Divider,
  TextField,
  Typography,
  Modal
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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  async function handleDelete() {
    const result = await fetch(`/api/study/${id}`, {
      method: 'DELETE',
    })
    if (result.ok) {
      router.push('/')
    }
    else {
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
        <Button
          onClick={() => {
            setOpen(true)
          }}
          startIcon={<DeleteIcon />}
        ></Button>
        <h1>{study?.title}</h1>
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
          
        <Modal 
          open={open}
          onClose={ () => setOpen(false)}>
          <Box2 sx={style}> 
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete study?
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Type in study name to confirm
            </Typography>
            <TextField value={name} onChange={e => setName(e.target.value) }>
            </TextField>
            <Button>
              Cancel
            </Button>
            <Button disabled={name !== study?.title} onClick={ handleDelete }>
              Submit
            </Button>
          </Box2>
        </Modal>
      </div>
    )
  }
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
