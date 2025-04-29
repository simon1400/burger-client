/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { NextPage } from 'next'

import styled from '@emotion/styled'
import { Container, Typography } from '@mui/material'
import BlockContent from 'components/BlockContent'
import Head from 'components/Head'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { useTranslations } from 'next-intl'
// eslint-disable-next-line import/order
import Image from 'next/image'
import { getMerch } from 'queries/merch'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'
import { ImgCard } from 'styles/ImgCard'
import { Price } from 'styles/Price'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: getMerch,
    variables: {
      slug: ctx.params?.slug,
      locale: ctx.locale,
    },
  })

  if (!data.merches.data.length) {
    return {
      notFound: true,
    }
  }

  const merch = data.merches.data[0].attributes

  store.dispatch(changeTitle(merch.meta?.title || merch.title))
  store.dispatch(changeDescription(merch.meta?.description || 'Merch'))

  return {
    props: {
      merch,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
})

const SwiperS = styled(Swiper)(
  ({ theme }) => `
  .swiper-button-prev, .swiper-button-next {
    color: ${theme.palette.primary.main};
  }
  .swiper-button-prev{
    left: 50px;
  }
  .swiper-button-next{
    right: 50px;
  }
`,
)

const Merch: NextPage<{ merch: any }> = ({ merch }) => {
  const t = useTranslations('global')
  return (
    <Page>
      <Head text={merch.title} type={'h1'} />
      <Price big>
        {merch.price}
        {` ${t('currency')}`}
      </Price>
      <Container maxWidth={'sm'}>
        <SwiperS navigation modules={[Navigation]}>
          {merch.image.data.map((image: any) => (
            <SwiperSlide key={image.attributes.url}>
              <ImgCard>
                <Image
                  src={`${APP_API + image.attributes.url}?format=webp&width=700`}
                  fill
                  alt={''}
                />
              </ImgCard>
            </SwiperSlide>
          ))}
        </SwiperS>
      </Container>
      <Container maxWidth={'md'}>
        <Typography
          textAlign={'center'}
          marginTop={12}
          marginBottom={12}
          component={'div'}
          dangerouslySetInnerHTML={{
            __html: merch.content.replace(/\/uploads/g, 'https://burger-strapi.hardart.cz/uploads'),
          }}
        />
      </Container>
      <BlockContent head={merch.title2} content={merch.content2} />
    </Page>
  )
}

export default Merch
