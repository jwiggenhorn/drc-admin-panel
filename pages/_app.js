import { SWRConfig } from 'swr'
import '@styles/globals.css'
import Layout from '@components/layout'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
    <SWRConfig
      value={{
        fetcher: (url, token) =>
          fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
