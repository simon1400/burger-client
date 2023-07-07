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
import { changeDescription, changeImage, changeTitle } from "stores/slices/metaSlices"

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: getPost,
      variables: {
        slug: ctx.params?.slug
      }
    });

    if(!data.posts.data.length) {
      return {
        notFound: true
      }
    }

    const post = data.posts.data[0].attributes;

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
        <Typography component="div" dangerouslySetInnerHTML={{__html: post.content}} />
      </Container>
      <Container maxWidth="xl">
        <ImgSquare>
          <Image src={APP_API+post.image.data.attributes.url+"?format=webp&width=1440"} fill alt="" />
        </ImgSquare>
      </Container>
    </Page>
  )
}

export default Blog