import BlockContent from "components/BlockContent";
import Head from "components/Head";
import Page from "layout/Page";
import { NextPage } from "next";
import { wrapper } from "stores";
import { client } from "lib/api";
import { changeDescription, changeTitle } from "stores/slices/metaSlices";
import { merchPageQuery, merchesQuery } from "queries/merch";
import { Container, Grid } from "@mui/material";
import Card from "components/Card";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: merchPageQuery,
    });

    const { data: merchesData } = await client.query({
      query: merchesQuery,
    });

    const merchPage = data.mercPage.data.attributes;
    const merches = merchesData.merches.data.map((item: any) => item.attributes);

    store.dispatch(changeTitle(merchPage.meta?.title || merchPage.title))
    store.dispatch(changeDescription(merchPage.meta?.description || 'Obchod'))

    return {
      props: {
        merchPage,
        merches
      }
    };
  }
);

const MerchShort: NextPage<{merchPage: any; merches: any}> = ({
  merchPage,
  merches
}) => {

  return (
    <Page>
      <Head data={merchPage.title} />
      <BlockContent content={merchPage.content} />
      <Container>
        <Grid container spacing={6} marginTop={12} marginBottom={12}>
          {merches.map((item: any, idx: number) => <Grid key={idx} item xs={6} md={3}>
            <Card data={item} />
          </Grid>)}
        </Grid>
      </Container>
      <BlockContent head={merchPage.title2} content={merchPage.content2} />
    </Page>
  );
};

export default MerchShort;
