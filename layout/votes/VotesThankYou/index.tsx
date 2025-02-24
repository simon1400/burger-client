import BlockContent from 'components/BlockContent'
import Head from 'components/Head'
import Page from 'layout/Page'
import { useTranslations } from 'next-intl'

const VotesThankYou = () => {
  const t = useTranslations('votes')

  return (
    <Page>
      <div style={{ margin: '40px 0 100px' }}>
        <Head data={t('thankYouPage.title')} />
        <BlockContent margin content={t('thankYouPage.text')} />
      </div>
    </Page>
  )
}

export default VotesThankYou
