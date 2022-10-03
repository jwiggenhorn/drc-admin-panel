import { useState } from 'react'
import Link from 'next/link'
import {
  Divider,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import useStudies from '@hooks/use-studies'

export default function Home() {
  const { studies, isLoading, isError } = useStudies()
  const [filter, setFilter] = useState('')
  const filteredStudies = studies
    ?.slice()
    .reverse()
    .filter((study) => study.title.toLowerCase().includes(filter.toLowerCase()))

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 6 }}>
        <CircularProgress size={350} thickness={2.5} />
      </Box>
    )
  else
    return (
      <div>
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Studies</h1>
          {studies?.length > 0 && (
            <TextField
              variant="standard"
              type="text"
              value={filter}
              label="Filter"
              onChange={(e) => setFilter(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </span>
        <Divider />
        {filteredStudies.map((study) => (
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
        {filteredStudies.length === 0 && (
          <Alert severity="info" sx={{ my: 3 }}>
            No studies found.
          </Alert>
        )}
        {isError && (
          <Alert severity="error" sx={{ my: 3 }}>
            Error fetching studies.
          </Alert>
        )}
      </div>
    )
}
