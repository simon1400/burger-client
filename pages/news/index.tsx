import type { NextPage } from 'next'

import { Container } from '@mui/material'
import ArticleShort from 'components/ArticleShort'
import BlockContent from 'components/BlockContent'
import Head from 'components/Head'
import { sortDate } from 'helpers/sortDate'
import Page from 'layout/Page'
import { client } from 'lib/api'
import Image from 'next/image'
import { newsPageQuery, newsQuery } from 'queries/news'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'
import { ImgSquare } from 'styles/ImgSquare'

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: newsPageQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const { data: newsData } = await client.query({
    query: newsQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const newsPage = data.newsPage.data.attributes
  const news = newsData.newss.data.map((item: any) => item.attributes)

  store.dispatch(changeTitle(newsPage.meta?.title || 'Blog'))
  store.dispatch(changeDescription(newsPage.meta?.description || ''))

  return {
    props: {
      newsPage,
      news,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
})

const colors = ['red', 'purple', 'yellow']

const News: NextPage<{ newsPage: any; news: any }> = ({ newsPage, news }) => {
  return (
    <Page>
      <Head text={newsPage.title} type={'h1'} />
      {!!newsPage.image.data && (
        <Container sx={{ mb: 20 }}>
          <CenterWrap>
            <ImgSquare partners>
              <Image
                src={`${APP_API + newsPage.image.data.attributes.url}?format=svg&resize=220x220`}
                fill
                alt={''}
              />
            </ImgSquare>
          </CenterWrap>
        </Container>
      )}
      <BlockContent content={newsPage.content} />
      <Container>
        {sortDate(news).map((item: any, idx: number) => (
          <ArticleShort
            type={'news'}
            key={item.name + idx}
            bg={colors[idx % colors.length] as 'red' | 'yellow' | 'purple'}
            data={item}
          />
        ))}
      </Container>
    </Page>
  )
}

export default News
