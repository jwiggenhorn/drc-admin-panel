import { useRouter } from 'next/router'
import useStudy from '@hooks/use-study'
import { inputProfileNames, post } from '@lib/utils'
import { Button, CircularProgress, Alert } from '@mui/material'
import { Box } from '@mui/system'

export default function Home() {
  const router = useRouter()
  const { id } = router.query
  const { study, isLoading, isError, participantData } = useStudy(id)

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 6 }}>
        <CircularProgress size={350} thickness={2.5} />
      </Box>
    )
  else
    return (
      <div>
        <h2>{study?.title}</h2>
        {study?.description && <p>Description: {study?.description}</p>}
        <h3>Key: {study?.key}</h3>
        <h3>Participant Limit: {study?.participantLimit}</h3>
        <h3>Input profile: {inputProfileNames.get(study?.inputProfile)}</h3>
        <h3>Data:</h3>
        {participantData?.map((data) => (
          <p key={data._id}>{JSON.stringify(data)}</p>
        ))}

        <Button
          variant="outlined"
          onClick={() => {
            post(`http://localhost:3000/api/study/data`, { key: study?.key })
          }}
        >
          generate test data
        </Button>

        {isError && <Alert severity="error">Error fetching study data</Alert>}
      </div>
    )
}
