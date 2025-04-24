import BlockContent from 'components/BlockContent'
import Head from 'components/Head'
import Page from 'layout/Page'
import { useLocale, useTranslations } from 'next-intl'

const czContent =
  "<p>Pro dokončení hlasování prosím potvrď svůj hlas v e-mailu. Výsledky najdeš nejpozději v pondělí na webu <a href='https://burgerstreetfestival.cz'>burgerstreetfestival.cz</a> a v události na Facebooku. Výherce budeme zároveň kontaktovat na e-mailu.</p>"
const plContent =
  "<p>Aby dokończyć głosowanie, potwierdź swój głos w e-mailu. Wyniki znajdziesz najpóźniej w poniedziałek na stronie <a href='https://burgerfestival.pl'>burgerfestival.pl</a> oraz w wydarzeniu na Facebooku. Zwycięzca zostanie dodatkowo poinformowany e-mailem.</p>"

const VotesThankYou = () => {
  const t = useTranslations('votes')

  const locale = useLocale()

  return (
    <Page>
      <div style={{ margin: '40px 0 100px' }}>
        <Head data={t('thankYouPage.title')} />
        <BlockContent margin content={locale === 'en' ? czContent : plContent} />
      </div>
    </Page>
  )
}

export default VotesThankYou
