/* eslint-disable no-console */
import axios from 'axios'
import BlockContent from 'components/BlockContent'
import Head from 'components/Head'
import Page from 'layout/Page'
import { useTranslations } from 'next-intl'

const APP_API = process.env.APP_API

export const getServerSideProps = async (ctx: any) => {
  axios
    .put(`${APP_API}/api/votes/${ctx.params?.id}`, { data: { mailConfirm: true } })
    .then(() => {
      console.log('Updated!')
    })
    .catch((err) => console.log('err updated form -- ', err.response.data.error))

  return {
    props: {
      votes: true,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
}

const ConfirmMail = () => {
  const t = useTranslations('global')
  return (
    <Page>
      <div style={{ margin: '40px 0 100px' }}>
        <Head text={t('verificationTaken')} type={'h1'} />
        <BlockContent margin content={`<p>${t('verificationCorrectMessage')}</p>`} />
      </div>
    </Page>
  )
}

export default ConfirmMail
