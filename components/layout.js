import Navbar from './navbar'
import { Alert } from '@mui/material'
import { Container } from '@mui/system'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <>
      <Navbar />
      {session || router.route === '/privacy' || router.route === '/about' ? (
        <main>
          <Container maxWidth="md">{children}</Container>
        </main>
      ) : (
        <Container maxWidth="sm">
          <Alert severity="warning">Please sign in to view this page.</Alert>
        </Container>
      )}
    </>
  )
}
