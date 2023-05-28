import BlockContent from "components/BlockContent";
import Events from "components/Lineup";
import Galery from "components/Galery";
import Head from "components/Head";
import Map from "components/Map";
import Page from "layout/Page";
import { NextPage } from "next";

const Homepage: NextPage = () => {
  return (
    <Page>
      <Map />
      <Head />
      <Events />
      <BlockContent content />
      <Galery />
    </Page>
  );
};

export default Homepage;
