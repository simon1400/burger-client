import BlockContent from "components/BlockContent"
import Lineup from "components/Lineup"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import Winners from "components/Winners"
import { wrapper } from "stores"
import { client } from "lib/api"
import { festivalsWinnersQuery } from "queries/festivals"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import { sortDate } from "helpers/sortDate"
import Button from "components/Button"
import { CenterWrap } from "styles/CenterWrap"
import { getMetaWinners } from "queries/meta"


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: festivalsWinnersQuery,
    });
    
    const { data: metaData } = await client.query({
      query: getMetaWinners,
    });

    const winners = data.festivals.data.map((item: any) => item.attributes);
    const meta = metaData.global.data.attributes.metaWinners;

    store.dispatch(changeTitle(meta?.title || 'Výherci'))
    store.dispatch(changeDescription(meta?.description || ''))

    return {
      props: {
        winners: sortDate(winners),
      }
    };
  }
);

const WinnersPage: NextPage<{winners: any}> = ({winners}) => {

  return (
    <Page>
      {winners.map((item: any, idx: number) => {
        if(item.winner1.data || item.winner2.data || item.winner3.data || item.vouchers.length) {
          return <div key={idx}>
            <Head data={item.title}/>
            <BlockContent head={item.place} margin time={{from: item.from, to: item.to}} />
            <CenterWrap marginBottom={80}>
              <Button href={`/${item.slug}`}>Detail akce</Button>
            </CenterWrap>
            <Winners winner1={item.winner1} winner2={item.winner2} winner3={item.winner3} />
            {!!item.vouchers.length && <Lineup head="Výherci voucherů" data={item.vouchers} />}
            <CenterWrap marginBottom={200}></CenterWrap>
          </div>  
        }else{
          return null
        }
      })}
    </Page>
  )
}

export default WinnersPage