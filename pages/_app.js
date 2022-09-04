import { SWRConfig } from 'swr'
import '@styles/globals.css'
import Layout from '@components/layout'

function MyApp({ Component, pageProps }) {
  return (
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
  )
}

export default MyApp
