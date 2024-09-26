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
import { changeDescription, changeImage, changeTitle } from "stores/slices/metaSlices"
import Galery from "components/Galery"
import { getNews } from "queries/news"

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: getNews,
      variables: {
        slug: ctx.params?.slug
      }
    });

    if(!data.newss.data.length) {
      return {
        notFound: true
      }
    }

    const post = data.newss.data[0].attributes;

    store.dispatch(changeTitle(post.meta?.title || post.title))
    store.dispatch(changeDescription(post.meta?.description || ''))
    store.dispatch(changeImage(APP_API+post.image.data.attributes.url+"?format=webp&width=1440" || ''))

    return {
      props: {
        post
      }
    };
  }
);

const Blog: NextPage<{post: any}> = ({post}) => {
  return (
    <Page>
      <Head data={post.title} />
      {post.label?.data && <Container>
        <CenterWrap>
          <LabelBare data={post.label.data.attributes.title} />
        </CenterWrap>
      </Container>}
      <Container maxWidth="md">
      {post.youtube?.length && <iframe width="100%" style={{aspectRatio: "16 / 9"}} src={`https://www.youtube.com/embed/${post.youtube}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}
      </Container>
      <Container maxWidth="md">
        <Typography component="div" dangerouslySetInnerHTML={{__html: post.content.replace(/\/uploads/g, "https://burger-strapi.hardart.cz/uploads")}} />
      </Container>
      <Container maxWidth="xl">
        <ImgSquare>
          <Image src={APP_API+post.image.data.attributes.url+"?format=webp&width=1440"} fill alt="" />
        </ImgSquare>
      </Container>
      {!!post.galery.data.length && <Galery images={post.galery}/>}
    </Page>
  )
}

export default Blog