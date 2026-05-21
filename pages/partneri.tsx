/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { NextPage } from 'next'

import { Container, Grid, Typography } from '@mui/material'
import Button from 'components/Button'
import Head from 'components/Head'
import Page from 'layout/Page'
import { getClient } from 'lib/api'
import Image from 'next/image'
import Link from 'next/link'
import partnersQuery from 'queries/partners'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'
import { ImgSquare } from 'styles/ImgSquare'

const APP_API = process.env.APP_API

interface PartnerRecord {
  id: string
  attributes: {
    name: string
    link?: string | null
    logo: {
      data: {
        attributes: {
          url: string
        }
      } | null
    }
  }
}

interface PartnerRelation {
  data: PartnerRecord[]
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await getClient().query({
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
      messages: (await import(`../messages/${ctx.locale}.json`)).default,
    },
  }
})

const getColumn = (count: number) => (count === 1 ? 12 : count === 2 ? 6 : count === 3 ? 4 : 3)

interface SectionProps {
  heading?: string
  relation: PartnerRelation
}

const Section = ({ heading, relation }: SectionProps) => {
  const items = (relation?.data ?? []).filter((p) => p.attributes.logo?.data)
  if (!items.length) return null
  const count = items.length

  return (
    <>
      {heading && (
        <Head className={'partners-head'} text={heading} type={'h2'} bg={'yellow1'} />
      )}
      <Container>
        <Grid container justifyContent={'center'}>
          {items.map((item) => {
            const url = item.attributes.logo.data!.attributes.url
            const square = (
              <ImgSquare big={count < 4} partners>
                <Image
                  src={`${APP_API + url}?format=webp&resize=330x330`}
                  fill
                  alt={item.attributes.name}
                />
              </ImgSquare>
            )
            return (
              <Grid key={item.id} item xs={12} md={getColumn(count)}>
                {item.attributes.link ? (
                  <Link href={item.attributes.link} target={'_blank'} rel={'noopener noreferrer'}>
                    {square}
                  </Link>
                ) : (
                  square
                )}
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

const PartnersPage: NextPage<{ partnersPage: any }> = ({ partnersPage }) => {
  return (
    <Page>
      <CenterWrap>
        <Head text={partnersPage.title} type={'h1'} />
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
          {partnersPage.button && (
            <Button href={partnersPage.button.link}>{partnersPage.button.text}</Button>
          )}
        </Container>
        <Section relation={partnersPage.topPartners} />
        <Section heading={partnersPage.headPartner} relation={partnersPage.partners} />
        <Section heading={partnersPage.headSupport} relation={partnersPage.supported} />
        <Section heading={partnersPage.headPartner2} relation={partnersPage.partners2} />
        <Container maxWidth={'md'}>
          <Head className={'partners-head'} text={partnersPage.title2} type={'h2'} bg={'yellow1'} />
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
