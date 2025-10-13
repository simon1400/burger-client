import type { NextPage } from 'next'

import { Container } from '@mui/material'
import ArticleShort from 'components/ArticleShort'
import Head from 'components/Head'
import { sortDate } from 'helpers/sortDate'
import Page from 'layout/Page'
import { client } from 'lib/api'
import Image from 'next/image'
import { blogPageQuery, postsQuery } from 'queries/blog'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'
import { ImgSquare } from 'styles/ImgSquare'

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: blogPageQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const { data: postsData } = await client.query({
    query: postsQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const blogPage = data.blog.data.attributes
  const posts = postsData.posts.data.map((item: any) => item.attributes)

  store.dispatch(changeTitle(blogPage.meta?.title || 'Blog'))
  store.dispatch(changeDescription(blogPage.meta?.description || ''))

  return {
    props: {
      blogPage,
      posts,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
})

const Blog: NextPage<{ blogPage: any; posts: any }> = ({ blogPage, posts }) => {
  return (
    <Page>
      <Head text={blogPage.title} type={'h1'} />
      <Container sx={{ mb: 20 }}>
        <CenterWrap>
          <ImgSquare partners>
            <Image
              src={`${APP_API + blogPage.image.data.attributes.url}?format=svg&resize=220x220`}
              fill
              alt={''}
            />
          </ImgSquare>
        </CenterWrap>
      </Container>
      <Container>
        {sortDate(posts).map((item: any, idx: number) => (
          <ArticleShort key={item.name + idx} data={item} />
        ))}
      </Container>
    </Page>
  )
}

export default Blog
