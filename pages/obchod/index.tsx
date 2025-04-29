import type { NextPage } from 'next'

import { Container, Grid } from '@mui/material'
import BlockContent from 'components/BlockContent'
import Card from 'components/Card'
import Head from 'components/Head'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { merchesQuery, merchPageQuery } from 'queries/merch'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: merchPageQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const { data: merchesData } = await client.query({
    query: merchesQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const merchPage = data.mercPage.data.attributes
  const merches = merchesData.merches.data.map((item: any) => item.attributes)

  store.dispatch(changeTitle(merchPage.meta?.title || merchPage.title))
  store.dispatch(changeDescription(merchPage.meta?.description || 'Obchod'))

  return {
    props: {
      merchPage,
      merches,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
})

const MerchShort: NextPage<{ merchPage: any; merches: any }> = ({ merchPage, merches }) => {
  return (
    <Page>
      <Head text={merchPage.title} type={'h1'} />
      <BlockContent content={merchPage.content} />
      <Container>
        <Grid container spacing={6} marginTop={12} marginBottom={12}>
          {merches.map((item: any, idx: number) => (
            <Grid key={idx} item xs={6} md={3}>
              <Card data={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <BlockContent head={merchPage.title2} content={merchPage.content2} />
    </Page>
  )
}

export default MerchShort
