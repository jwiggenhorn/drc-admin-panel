import { useRouter } from 'next/router'
import useStudy from '@hooks/use-study'
import { inputProfileNames, post } from '@lib/utils'
import { Button, CircularProgress, Alert, Divider, FormControl, InputLabel, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { useState } from 'react'
import { ViewCarousel } from '@mui/icons-material'

const generateDataForChart = (participantData, selectedParticipant) => {
  const chartColors = ['rgba(255, 99, 132, 1)', 
                      'rgba(53, 162, 235, 1)',
                      'rgba(153, 102, 255, 1)']
  const data = {
    datasets: []
  }
  
  for (const [k, v] of Object.entries(participantData[selectedParticipant])) {
    if (v.length != 0 && k.charAt(0) != '_') {
      data.datasets.push({
        label: k,
        data: Array.from(v, (e) => ({
          x: e.millisecondsElapsed,
          y: e.state,
        })),
        backgroundColor: chartColors.pop(0)
      })
    }
  }
  return data
}

const handleExportData = () => {
  // TODO
}

export default function Home() {
  const router = useRouter()
  const { id } = router.query
  const { study, isLoading, isError, participantData } = useStudy(id)
  const [selectedParticipant, setSelectedParticipant] = useState(0);
  const selectedParticipantValid = 
    selectedParticipant >= 0 && selectedParticipant < participantData?.length;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 6 }}>
        <CircularProgress size={350} thickness={2.5} />
      </Box>
    )
  } else if (isError) {
    <div>
      {isError && <Alert severity="error">Error fetching study data</Alert>}
    </div>
  }
  else {
    ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }

    const data = generateDataForChart(participantData, selectedParticipant)
    return (
      <div>
        <h1>{study?.title}</h1>
        <Divider/>
        
        {study?.description && <p>Description: {study?.description}</p>}
        <p>Key: {study?.key}</p>
        <p>Participant Limit: {study?.participantLimit}</p>
        <p>Input profile: {inputProfileNames.get(study?.inputProfile)}</p>
        <Divider/>
        <TextField
          id="outlined-basic"
          label="Selected Participant"
          variant="outlined"
          type="number"
          value={selectedParticipant+1}
          onChange={(e) => setSelectedParticipant(e.target.value - 1)}
          sx={{ my: 3,  mr: 2}}
          inputProps={{ min: 1, max: participantData?.length ?? 1 }}
          error={!selectedParticipantValid}
          helperText={false ? '' : `Must be between 1 and ${participantData?.length ?? 1}`}
        />

        <Button
          variant="contained"
          onClick={handleExportData}
          sx={{my: 3, mx: 2, py: 2}}>
          Export as csv
        </Button>

        <Scatter options={options} data={data}/>
      </div>
    )
  }
}
