import Link from 'next/link'
import { Button, Box, AppBar, Toolbar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'

export default function Navbar() {
  return (
    <Box sx={{ mb: 6 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <span>
            <Link href="/" passHref>
              <Button color="inherit" startIcon={<HomeIcon />} sx={{ mr: 2 }}>
                Home
              </Button>
            </Link>
            <Link href="/create-study" passHref>
              <Button color="inherit" startIcon={<AddIcon />}>
                New Study
              </Button>
            </Link>
          </span>
          <Link href="/" passHref>
            <Button color="inherit">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
