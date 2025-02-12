/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { NextPage } from 'next'

import { Container, Grid, Typography } from '@mui/material'
import Button from 'components/Button'
import Head from 'components/Head'
import Page from 'layout/Page'
import { client } from 'lib/api'
import Image from 'next/image'
import Link from 'next/link'
import partnersQuery from 'queries/partners'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'
import { ImgSquare } from 'styles/ImgSquare'

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: partnersQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const partners = data.partner.data.attributes

  store.dispatch(changeTitle(partners.meta?.title || partners.title))
  store.dispatch(changeDescription(partners.meta?.description || ''))

  return {
    props: {
      partnersPage: partners,
    },
  }
})

const PartnersPage: NextPage<{ partnersPage: any }> = ({ partnersPage }) => {
  const topPartnerLength = partnersPage.topPartners.length
  const partnerLength = partnersPage.partners.length
  const partner2Length = partnersPage.partners2.length
  const supportedLength = partnersPage.supported.length

  const getColumn = (count: number) => {
    return count === 1 ? 12 : 3
  }

  return (
    <Page>
      <CenterWrap>
        <Head data={partnersPage.title} />
        <Container>
          <Typography
            marginBottom={10}
            component={'div'}
            dangerouslySetInnerHTML={{
              __html: partnersPage.content.replace(
                /\/uploads/g,
                'https://burger-strapi.hardart.cz/uploads',
              ),
            }}
          />
          <Button href={partnersPage.button.link}>{partnersPage.button.text}</Button>
        </Container>
        <Container>
          <Typography variant={'h2'} marginTop={10}>
            {partnersPage.headTopPartner}
          </Typography>
          <Grid container justifyContent={'center'}>
            {partnersPage.topPartners.map((item: any, idx: number) => (
              <Grid key={item.link} item xs={12} md={getColumn(topPartnerLength)}>
                <Link href={item.link}>
                  <ImgSquare big={topPartnerLength < 4} partners>
                    <Image
                      src={`${APP_API + item.image.data.attributes.url}?format=webp&resize=330x330`}
                      fill
                      alt={''}
                    />
                  </ImgSquare>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container>
          <Typography variant={'h2'} marginTop={10}>
            {partnersPage.headPartner}
          </Typography>
          <Grid container justifyContent={'center'}>
            {partnersPage.partners.map((item: any, idx: number) => (
              <Grid key={item.link} item xs={12} md={getColumn(partnerLength)}>
                <Link href={item.link}>
                  <ImgSquare big={partnerLength < 4} partners>
                    <Image
                      src={`${APP_API + item.image.data.attributes.url}?format=webp&resize=330x330`}
                      fill
                      alt={''}
                    />
                  </ImgSquare>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container>
          <Typography variant={'h2'} marginTop={10}>
            {partnersPage.headSupport}
          </Typography>
          <Grid container justifyContent={'center'}>
            {partnersPage.supported.map((item: any, idx: number) => (
              <Grid key={item.link} item xs={12} md={getColumn(supportedLength)}>
                <Link href={item.link}>
                  <ImgSquare big={supportedLength < 4} partners>
                    <Image
                      src={`${APP_API + item.image.data.attributes.url}?format=webp&resize=330x330`}
                      fill
                      alt={''}
                    />
                  </ImgSquare>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container>
          <Typography variant={'h2'} marginTop={10}>
            {partnersPage.headPartner2}
          </Typography>
          <Grid container justifyContent={'center'}>
            {partnersPage.partners2.map((item: any, idx: number) => (
              <Grid key={item.link} item xs={12} md={getColumn(partner2Length)}>
                <Link href={item.link}>
                  <ImgSquare big={partner2Length < 4} partners>
                    <Image
                      src={`${APP_API + item.image.data.attributes.url}?format=webp&resize=330x330`}
                      fill
                      alt={''}
                    />
                  </ImgSquare>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container maxWidth={'md'}>
          <Typography variant={'h2'} marginTop={10}>
            {partnersPage.title2}
          </Typography>
          <Typography
            marginBottom={15}
            component={'div'}
            dangerouslySetInnerHTML={{
              __html: partnersPage.content2.replace(
                /\/uploads/g,
                'https://burger-strapi.hardart.cz/uploads',
              ),
            }}
          />
        </Container>
      </CenterWrap>
    </Page>
  )
}

export default PartnersPage
