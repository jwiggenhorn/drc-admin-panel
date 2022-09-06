import Navbar from './navbar'
import { Container } from '@mui/system'
import { useSession } from 'next-auth/react'
import { Alert } from '@mui/material'

export default function Layout({ children }) {
  const { data: session } = useSession()
  return (
    <>
      <Navbar />
      {session && (
        <main>
          <Container maxWidth="md">{children}</Container>
        </main>
      )}
      {!session && (
        <Container maxWidth="sm">
          <Alert severity="warning">Please sign in to view this page.</Alert>
        </Container>
      )}
    </>
  )
}
