import { useState } from 'react'
import { useRouter } from 'next/router'
import useStudy from '@hooks/use-study'
import {
  inputProfileNames,
  generateDataForChart,
  chartOptions,
  exportAsCSV,
} from '@lib/utils'
import { Box } from '@mui/system'
import {
  Button,
  CircularProgress,
  Alert,
  Divider,
  TextField,
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
              sx={{ my: 3, mr: 2 }}
              inputProps={{ min: 1, max: participantData?.length ?? 1 }}
            />
            <Button
              variant="contained"
              onClick={() => { exportAsCSV(participantData, study.inputProfile, study.title) }}
              sx={{ my: 3, mx: 2, py: 2 }}
            >
              Export as csv
            </Button>
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
      </div>
    )
  }
}
