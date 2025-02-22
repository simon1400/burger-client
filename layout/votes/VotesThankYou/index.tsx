import BlockContent from 'components/BlockContent'
import Head from 'components/Head'
import Page from 'layout/Page'

const VotesThankYou = () => {
  return (
    <Page>
      <div style={{ margin: '40px 0 100px' }}>
        <Head data={'Děkujeme!'} />
        <BlockContent
          margin
          content={
            "<p>Pro dokončení hlasování prosím potvrď svůj hlas v e-mailu. Výsledky najdeš nejpozději v pondělí na webu <a href='https://burgerfestival.cz'>burgerfestival.cz</a> a v události na Facebooku. Výherce budeme zároveň kontaktovat na e-mailu.</p>"
          }
        />
      </div>
    </Page>
  )
}

export default VotesThankYou
