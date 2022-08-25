import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import Apploading from '../components/Layout/Apploading'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Apploading>
          <Component {...pageProps} />
        </Apploading>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
