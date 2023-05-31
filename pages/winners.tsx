import BlockContent from "components/BlockContent"
import Lineup from "components/Lineup"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import Winners from "components/Winners"
import { wrapper } from "stores"
import { client } from "lib/api"
import { festivalsWinnersQuery } from "queries/festivals"


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: festivalsWinnersQuery,
    });

    const winners = data.festivals.data.map((item: any) => item.attributes);

    // store.dispatch(changeTitle(homepage.meta?.title || 'Úvod'))
    // store.dispatch(changeDescription(homepage.meta?.description || ''))

    return {
      props: {
        winners,
      }
    };
  }
);

const WinnersPage: NextPage<{winners: any}> = ({winners}) => {
  console.log(winners)
  return (
    <Page>
      {winners.map((item: any, idx: number) => <div key={idx}>
        <Head data={item.title}/>
        <BlockContent head={item.place} margin time />
        <Winners winner1={item.winner1} winner2={item.winner2} winner3={item.winner3} />
        <Lineup head="Výherci voucherů" data={item.vouchers} />
      </div>)}
    </Page>
  )
}

export default WinnersPage