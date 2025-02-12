/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { NextPage } from 'next'

import { Container, Typography } from '@mui/material'
import Galery from 'components/Galery'
import Head from 'components/Head'
import LabelBare from 'components/LabelBare'
import Page from 'layout/Page'
import { client } from 'lib/api'
import Image from 'next/image'
import { getPost } from 'queries/blog'
import { wrapper } from 'stores'
import { changeDescription, changeImage, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'
import { ImgSquare } from 'styles/ImgSquare'

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: getPost,
    variables: {
      slug: ctx.params?.slug,
      locale: ctx.locale,
    },
  })

  if (!data.posts.data.length) {
    return {
      notFound: true,
    }
  }

  const post = data.posts.data[0].attributes

  store.dispatch(changeTitle(post.meta?.title || post.title))
  store.dispatch(changeDescription(post.meta?.description || ''))
  store.dispatch(
    changeImage(`${APP_API + post.image.data.attributes.url}?format=webp&width=1440` || ''),
  )

  return {
    props: {
      post,
    },
  }
})

const Blog: NextPage<{ post: any }> = ({ post }) => {
  return (
    <Page>
      <Head data={post.title} />
      {post.label?.data && (
        <Container>
          <CenterWrap>
            <LabelBare data={post.label.data.attributes.title} />
          </CenterWrap>
        </Container>
      )}
      <Container maxWidth={'md'}>
        <Typography
          component={'div'}
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\/uploads/g, 'https://burger-strapi.hardart.cz/uploads'),
          }}
        />
      </Container>
      <Container maxWidth={'xl'}>
        <ImgSquare>
          <Image
            src={`${APP_API + post.image.data.attributes.url}?format=webp&width=1440`}
            fill
            alt={''}
          />
        </ImgSquare>
      </Container>
      {!!post.galery.data.length && <Galery images={post.galery} />}
    </Page>
  )
}

export default Blog
