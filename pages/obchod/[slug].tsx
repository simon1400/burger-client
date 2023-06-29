import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container, Typography } from "@mui/material"
import Image from "next/image"
import { wrapper } from "stores"
import { client } from "lib/api"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import { getMerch } from "queries/merch"
import { Price } from "styles/Price"
import { ImgCard } from "styles/ImgCard"
import BlockContent from "components/BlockContent"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styled from "@emotion/styled"

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

    store.dispatch(changeTitle(merch.meta?.title || merch.title))
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
      <Price big>{merch.price} Kč</Price>
      <Container maxWidth="sm">
        <SwiperS navigation={true} modules={[Navigation]}>
          {merch.image.data.map((image: any, idx: number) => <SwiperSlide key={idx}>
            <ImgCard>
              <Image src={APP_API+image.attributes.url+"?format=webp&width=700"} fill alt="" />
            </ImgCard>
          </SwiperSlide>)}
        </SwiperS>
      </Container>
      <Container maxWidth="md">
        <Typography textAlign="center" marginTop={12} marginBottom={12} component="div" dangerouslySetInnerHTML={{__html: merch.content}} />
      </Container>
      <BlockContent head={merch.title2} content={merch.content2} />
    </Page>
  )
}

export default Merch

const SwiperS = styled(Swiper)(({theme}) => `
  .swiper-button-prev, .swiper-button-next {
    color: ${theme.palette.primary.main};
  }
  .swiper-button-prev{
    left: 50px;
  }
  .swiper-button-next{
    right: 50px;
  }
`)