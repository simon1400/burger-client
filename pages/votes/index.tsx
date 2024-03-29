import BlockContent from "components/BlockContent"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { wrapper } from "stores"
import { client } from "lib/api"
import { festivalsQuery } from "queries/festivals"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import Button from "components/Button"
import { CenterWrap } from "styles/CenterWrap"
import { filterEvents } from "helpers/filterEvents"


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {

    const { data } = await client.query({
      query: festivalsQuery,
    });

    const festivals = data.festivals.data.map((item: any) => item.attributes)
    const filteredFestivals = filterEvents(festivals)

    store.dispatch(changeTitle('Votes'))
    store.dispatch(changeDescription(''))

    return {
      props: {
        festivals: filteredFestivals.future[0],
        votes: true
      }
    };
  }
);

const Votes: NextPage<{festivals: any}> = ({festivals}) => {

  return (
    <Page>
      <div style={{margin: '40px 0 100px'}}>
        <Head data={festivals.title}/>
        <BlockContent head={festivals.place} margin content={`<p><strong>Hlasuj pro nejlepší burger na festivalu! I díky tobě třeba bude tvůj burgermaker mít medaili.</strong></p>
            <p><strong>Jak na to?</strong></p>
            <p>1. Vyplň svoje osobní údaje.</br>
            2. Zadej kód z hlasovacího lístku, který jsi dostal při nákupu burgeru.</br>
            3. Hlasuj pro tvého favorita.</br>
            4. Potvrď souhlas s podmínkami soutěže a zpracováním osobních údajů.</br>
            5. Klikni na ODESLAT</p>
            <p><strong>A to je vše!</strong></p>
            <p>Křestní jméno výherce a výherní kód zveřejníme na webu <a href="http://burgerfestival.cz" title="smartCard-inline">http://burgerfestival.cz</a>  a na události festivalu na Facebooku nejpozději v pondělí po festivalu. Pokud jsi vyhrál, dáme ti vědět také mailem.</p>
            <p><strong>O co hrajeme?</strong></p>
            <p>1. cena - voucher 2000 Kč na burgery pro festivaly v sezoně 2024 a 2025</br>
              2. cena - voucher 1000 Kč na burgery pro festivaly v sezoně 2024 a 2025</br>
              3. cena - voucher  500 Kč na burgery pro festivaly v sezoně 2024 a 2025</p>
            `} />
        <CenterWrap marginBottom={80}>
          <Button href={`/votes/${festivals.slug}`}>Začít hlasovat</Button>
        </CenterWrap>
      </div>
    </Page>
  )
}

export default Votes