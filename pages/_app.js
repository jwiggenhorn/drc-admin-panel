import '@styles/globals.css'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
