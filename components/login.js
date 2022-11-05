import { Button } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Component() {
  const { data: session } = useSession()

  return session ? (
    <>
      Signed in as {session.user.email} <br />
      <Button color="inherit" onClick={() => signOut()}>
        Sign Out
      </Button>
    </>
  ) : (
    <Button color="inherit" onClick={() => signIn()}>
      Sign in
    </Button>
  )
}
