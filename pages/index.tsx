import BlockContent from "components/BlockContent";
import Events from "components/Lineup";
import Galery from "components/Galery";
import Head from "components/Head";
import Map from "components/Map";
import Page from "layout/Page";
import { NextPage } from "next";
import { wrapper } from "stores";
import { client } from "lib/api";
import homepageQuery from "queries/homepage";
import { changeDescription, changeTitle } from "stores/slices/metaSlices";
import {festivalsQuery} from "queries/festivals";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: homepageQuery,
    });

    const { data: festivalsData } = await client.query({
      query: festivalsQuery,
    });

    const homepage = data.homepage.data.attributes;
    const festivals = festivalsData.festivals.data.map((item: any) => item.attributes)

    store.dispatch(changeTitle(homepage.meta?.title || 'Úvod'))
    store.dispatch(changeDescription(homepage.meta?.description || ''))

    return {
      props: {
        homepage,
        festivals
      }
    };
  }
);

const Homepage: NextPage<{homepage: IHomepage; festivals: IFestivals}> = ({
  homepage,
  festivals
}) => {

  return (
    <Page>
      <Map />
      <Head data={homepage.title} />
      <Events head={homepage.eventHead} data={festivals} hp />
      <BlockContent head={homepage.title2} content={homepage.content} />
      <Galery images={homepage.galery}/>
    </Page>
  );
};

export default Homepage;
