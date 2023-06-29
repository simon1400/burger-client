import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Footer from 'layout/Footer';
import Header from 'layout/Header';
import Modal from 'layout/Modal';
import { WithGraphQL } from 'lib/api';
import createEmotionCache from 'lib/createEmotionCache';
import type { AppProps } from 'next/app'
import { FC } from 'react';
import { Provider } from 'react-redux';
import { wrapper } from 'stores';
import theme from 'styles/theme';
import { globalVariables } from 'styles/var';

import 'styles/global.scss'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: FC<MyAppProps> = ({ Component, ...rest }) => {

  const { store, props } = wrapper.useWrappedStore(rest);
  const clientSideEmotionCache = createEmotionCache();
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={{ ...theme, ...globalVariables }}>
          <CssBaseline />
          <WithGraphQL>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <Modal />
          </WithGraphQL>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
