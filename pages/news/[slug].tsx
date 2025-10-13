/* eslint-disable react-dom/no-dangerously-set-innerhtml */
/* eslint-disable react-dom/no-missing-iframe-sandbox */
import type { NextPage } from 'next'

import styled from '@emotion/styled'
import { Container } from '@mui/material'
import Galery from 'components/Galery'
import Head from 'components/Head'
import LabelBare from 'components/LabelBare'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { getNews } from 'queries/news'
import { wrapper } from 'stores'
import { changeDescription, changeImage, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'

const APP_API = process.env.APP_API

const ContentWrapper = styled.div`
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-left: 0;
    margin-right: 0;
  }

  figure {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
  }

  p {
    img {
      margin-left: 0;
      margin-right: 0;
    }
  }
`

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: getNews,
    variables: {
      slug: ctx.params?.slug,
      locale: ctx.locale,
    },
  })

  if (!data.newss.data.length) {
    return {
      notFound: true,
    }
  }

  const post = data.newss.data[0].attributes

  store.dispatch(changeTitle(post.meta?.title || post.title))
  store.dispatch(changeDescription(post.meta?.description || ''))
  store.dispatch(
    changeImage(`${APP_API + post.image.data.attributes.url}?format=webp&width=1440` || ''),
  )

  return {
    props: {
      post,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
})

const Blog: NextPage<{ post: any }> = ({ post }) => {
  return (
    <Page>
      <Head text={post.title} type={'h1'} />
      {post.label?.data && (
        <Container>
          <CenterWrap>
            <LabelBare data={post.label.data.attributes.title} />
          </CenterWrap>
        </Container>
      )}
      <Container maxWidth={'md'}>
        {post.youtube?.length && (
          <iframe
            width={'100%'}
            style={{ aspectRatio: '16 / 9' }}
            src={`https://www.youtube.com/embed/${post.youtube}`}
            title={'YouTube video player'}
            frameBorder={'0'}
            allow={
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            }
            referrerPolicy={'strict-origin-when-cross-origin'}
            allowFullScreen
          />
        )}
      </Container>
      <Container maxWidth={'md'}>
        <ContentWrapper
          dangerouslySetInnerHTML={{
            __html: post.content.includes('https://')
              ? post.content
              : post.content.replace(/\/uploads/g, `${APP_API}/uploads`),
          }}
        />
      </Container>
      {!!post.galery.data.length && <Galery images={post.galery} />}
    </Page>
  )
}

export default Blog
