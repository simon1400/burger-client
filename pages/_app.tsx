import type { EmotionCache } from '@emotion/react'
import type { AppProps } from 'next/app'
import type { FC } from 'react'

import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Footer from 'layout/Footer'
import Header from 'layout/Header'
import Modal from 'layout/Modal'
import { WithGraphQL } from 'lib/api'
import createEmotionCache from 'lib/createEmotionCache'
import { NextIntlClientProvider } from 'next-intl'
// eslint-disable-next-line import/order
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { wrapper } from 'stores'
import theme from 'styles/theme'
import { globalVariables } from 'styles/var'
import 'styles/global.scss'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: FC<MyAppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const clientSideEmotionCache = createEmotionCache()
  const { emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={{ ...theme, ...globalVariables }}>
          <NextIntlClientProvider
            locale={router.locale}
            timeZone={'Europe/Prague'}
            messages={pageProps.messages}
          >
            <CssBaseline />
            <WithGraphQL>
              {!pageProps.votes && <Header />}
              <Component {...pageProps} />
              {!pageProps.votes && <Footer />}
              {!pageProps.votes && <Modal />}
            </WithGraphQL>
          </NextIntlClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}

export default MyApp
