import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container, Typography } from "@mui/material"
import Image from "next/image"
import { CenterWrap } from "styles/CenterWrap"
import LabelBare from "components/LabelBare"
import { ImgSquare } from "styles/ImgSquare"
import { wrapper } from "stores"
import { client } from "lib/api"
import { getPost } from "queries/blog"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import { getMerch } from "queries/merch"
import { Price } from "styles/Price"
import { ImgCard } from "styles/ImgCard"
import BlockContent from "components/BlockContent"

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: getMerch,
      variables: {
        slug: ctx.params?.slug
      }
    });

    if(!data.merches.data.length) {
      return {
        notFound: true
      }
    }

    const merch = data.merches.data[0].attributes;

    store.dispatch(changeTitle(merch.meta?.title || 'Merch'))
    store.dispatch(changeDescription(merch.meta?.description || 'Merch'))

    return {
      props: {
        merch
      }
    };
  }
);

const Merch: NextPage<{merch: any}> = ({merch}) => {
  return (
    <Page>
      <Head data={merch.title} />
      <Price big>{merch.price}</Price>
      <Container>
        <ImgCard>
          <Image src={APP_API+merch.image.data.attributes.url} fill alt="" />
        </ImgCard>
      </Container>
      <Container maxWidth="md">
        <Typography textAlign="center" marginTop={12} marginBottom={12} component="div" dangerouslySetInnerHTML={{__html: merch.content}} />
      </Container>
      <BlockContent head={merch.title2} content={merch.content2} />
    </Page>
  )
}

export default Merch