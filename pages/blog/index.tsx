import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container } from "@mui/material"
import Image from "next/image"
import { CenterWrap } from "styles/CenterWrap"
import ArticleShort from "components/ArticleShort"
import { wrapper } from "stores"
import { client } from "lib/api"
import { blogPageQuery, postsQuery } from "queries/blog"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import { ImgSquare } from "styles/ImgSquare"

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: blogPageQuery,
    });
    
    const { data: postsData } = await client.query({
      query: postsQuery,
    });

    const blogPage = data.blog.data.attributes;
    const posts = postsData.posts.data.map((item: any) => item.attributes);

    store.dispatch(changeTitle(blogPage.meta?.title || 'Blog'))
    store.dispatch(changeDescription(blogPage.meta?.description || ''))

    return {
      props: {
        blogPage,
        posts
      }
    };
  }
);

const Blog: NextPage<{blogPage: any; posts: any}> = ({blogPage, posts}) => {

  return (
    <Page>
      <Head data={blogPage.title} />
      <Container sx={{mb: 20}}>
        <CenterWrap>
          <ImgSquare partners>
            <Image src={APP_API+blogPage.image.data.attributes.url+"?format=svg&resize=220x220"} fill alt="" />
          </ImgSquare>
        </CenterWrap>
      </Container>
      <Container>
        {posts.map((item: any, idx: number) => <ArticleShort key={idx} data={item} />)}
      </Container>
    </Page>
  )
}

export default Blog