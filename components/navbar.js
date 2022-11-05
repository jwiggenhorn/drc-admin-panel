import Link from 'next/link'
import { Button, Box, AppBar, Toolbar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import Login from '@components/login.js'

export default function Navbar() {
  return (
    <Box sx={{ mb: 6 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <span>
            <Link href="/" passHref>
              <Button color="inherit" startIcon={<HomeIcon />}>
                Home
              </Button>
            </Link>
            <Link href="/create-study" passHref>
              <Button color="inherit" startIcon={<AddIcon />} sx={{ mx: 2 }}>
                New Study
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button color="inherit" startIcon={<InfoIcon />}>
                About
              </Button>
            </Link>
          </span>
          <Login />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
