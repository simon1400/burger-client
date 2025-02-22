/* eslint-disable react-dom/no-missing-iframe-sandbox */
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={'cs'}>
      <Head />
      <body>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src={'https://www.googletagmanager.com/ns.html?id=GTM-MPJ6DQS'}
            height={'0'}
            width={'0'}
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
