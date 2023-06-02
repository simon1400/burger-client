import BlockContent from "components/BlockContent"
import Lineup from "components/Lineup"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import Galery from "components/Galery"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import { client } from "lib/api"
import { wrapper } from "stores"
import { festivalsPageQuery, festivalsQuery } from "queries/festivals"
import { filterEvents } from "helpers/filterEvents"

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({query: festivalsPageQuery});

    const { data: festivalsData } = await client.query({
      query: festivalsQuery,
    });

    // if(!data.festivals.data.length) {
    //   return {
    //     notFound: true
    //   }
    // }

    const festivalPage = data.festivalsPage.data.attributes;
    const festivals = festivalsData.festivals.data.map((item: any) => item.attributes)

    store.dispatch(changeTitle(festivalPage.meta?.title || 'Festivals'))
    store.dispatch(changeDescription(festivalPage.meta?.description || 'Festivals'))

    return {
      props: {
        festivalPage,
        festivals
      }
    };
  }
);

const Festival: NextPage<{festivalPage: any; festivals: any}> = ({
  festivalPage,
  festivals
}) => {

  const filteredFestivals = filterEvents(festivals)

  return (
    <Page>
      <Head data={festivalPage.title} />
      <BlockContent content={festivalPage.content} />
      {!!filteredFestivals.future.length && <Lineup head="Nejbližší akce" data={filteredFestivals.future} hp />}
      {!!filteredFestivals.old.length && <Lineup head="Již broběhlo" data={filteredFestivals.old} hp /> }
      <BlockContent head={festivalPage.title2} content={festivalPage.content2} />
      {!!festivalPage.galery?.data?.length && <Galery images={festivalPage.galery} />}
    </Page>
  )
}

export default Festival