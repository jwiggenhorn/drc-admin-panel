import Link from 'next/link'
import {
  Divider,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import useAdmin from '@hooks/use-admin'

export default function Home() {
  const { studies, isLoading, isError } = useAdmin()

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 6 }}>
        <CircularProgress size={350} thickness={2.5} />
      </Box>
    )
  else
    return (
      <div>
        <h1>Studies</h1>
        <Divider />
        {studies?.map((study) => (
          <Link
            href={{
              pathname: '/study/[id]',
              query: { id: study._id },
            }}
            key={study._id}
          >
            <ListItemButton divider>
              <ListItemText primary={study.title} />
            </ListItemButton>
          </Link>
        ))}
        {studies?.length === 0 && <p>No studies found.</p>}

        {isError && <h1 style={{ color: 'red' }}>Something went wrong!!</h1>}
      </div>
    )
}
