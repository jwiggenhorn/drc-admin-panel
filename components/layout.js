import Navbar from './navbar'
import { Container } from '@mui/system'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <Container maxWidth="md">{children}</Container>
      </main>
    </>
  )
}
