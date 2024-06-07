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
import mapQuery from "queries/map";
import { CenterWrap } from "styles/CenterWrap";
import Button from "components/Button";
import { filterEvents } from "helpers/filterEvents";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: homepageQuery,
    });

    const { data: festivalsData } = await client.query({
      query: festivalsQuery,
    });
    
    const { data: mapData } = await client.query({
      query: mapQuery,
    });

    const homepage = data.homepage.data.attributes;
    const festivals = festivalsData.festivals.data.map((item: any) => item.attributes)
    const map = mapData.map.data.attributes

    store.dispatch(changeTitle(homepage.meta?.title || 'Úvod'))
    store.dispatch(changeDescription(homepage.meta?.description || ''))

    return {
      props: {
        homepage,
        festivals: filterEvents(festivals),
        map
      }
    };
  }
);

const Homepage: NextPage<{homepage: IHomepage; festivals: IFestivals; map: any}> = ({
  homepage,
  festivals,
  map
}) => {

  return (
    <Page>
      <Map data={map}/>
      <Head data={homepage.title} />
      {/* @ts-ignore */}
      <Events head={homepage.eventHead} data={festivals.future} hp />
      <CenterWrap marginBottom={80}>
        <Button href="/festivaly">Zobrazit proběhlé akce</Button>
      </CenterWrap>
      <BlockContent head={homepage.title2} content={homepage.content} />
      <Galery images={homepage.galery}/>
    </Page>
  );
};

export default Homepage;
