/* eslint-disable react-dom/no-missing-iframe-sandbox */
import type { DocumentContext, DocumentInitialProps } from 'next/document'

import { Head, Html, Main, NextScript } from 'next/document'

export default function Document({ locale }: { locale: string }) {
  return (
    <Html lang={locale}>
      <Head />
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={'https://www.googletagmanager.com/ns.html?id=GTM-MPJ6DQS'}
            height={'0'}
            width={'0'}
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Document.getInitialProps = async (
  ctx: DocumentContext,
): Promise<DocumentInitialProps & { locale: string }> => {
  const initialProps = await ctx.renderPage()
  const locale = ctx.locale === 'en' ? 'cs' : 'pl' // Fallback на 'en', если locale не найден
  return { ...initialProps, locale }
}
