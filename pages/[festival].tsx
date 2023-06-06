import BlockContent from "components/BlockContent"
import Lineup from "components/Lineup"
import FacebookEvent from "components/FacebookEvent"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container, Grid } from "@mui/material"
import Winner from "components/Winner"
import Galery from "components/Galery"
import Winners from "components/Winners"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import { client } from "lib/api"
import { wrapper } from "stores"
import { getFestival } from "queries/festivals"
import { beforeDate } from "helpers/beforeDate"

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: getFestival,
      variables: {
        slug: ctx.params?.festival
      }
    });

    if(!data.festivals.data.length) {
      return {
        notFound: true
      }
    }

    const festival = data.festivals.data[0].attributes;

    store.dispatch(changeTitle(festival.meta?.title || ''))
    store.dispatch(changeDescription(festival.meta?.description || ''))

    return {
      props: {
        festival
      }
    };
  }
);

const Festival: NextPage<{festival: IFestival}> = ({
  festival
}) => {

  console.log(festival)

  return (
    <Page>
      <Head data={festival.title} />
      <BlockContent time={{from: festival.from, to: festival.to}} head={festival.place} content={festival.content} />
      {beforeDate(festival.from) && <BlockContent content={festival.contentBefore} />}
      {!beforeDate(festival.to) &&<BlockContent content={festival.contentAfter} />}
      {festival.social && <FacebookEvent single data={festival.social} />}
      {!!festival.lineup.data.length && <Lineup head="Lineup" data={festival.lineup.data.map((item: any) => item.attributes)} modal />}
      <Winners winner1={festival.winner1} winner2={festival.winner2} winner3={festival.winner3} />
      {!!festival.vouchers.length && <Lineup head="Výherci voucherů" data={festival.vouchers} />}
      {!!festival.galery.data?.length && <Galery images={festival.galery} />}
    </Page>
  )
}

export default Festival