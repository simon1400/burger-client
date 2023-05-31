import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container } from "@mui/material"
import { ImgCircle } from "styles/ImgCircle"
import Image from "next/image"
import { CenterWrap } from "styles/CenterWrap"
import ArticleShort from "components/ArticleShort"
import { wrapper } from "stores"
import { client } from "lib/api"
import { blogPageQuery, postsQuery } from "queries/blog"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"

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
      <Container>
        <CenterWrap>
          <ImgCircle>
            <Image src={APP_API+blogPage.image.data.attributes.url} fill alt="" />
          </ImgCircle>
        </CenterWrap>
      </Container>
      <Container>
        {posts.map((item: any, idx: number) => <ArticleShort key={idx} data={item} />)}
      </Container>
    </Page>
  )
}

export default Blog