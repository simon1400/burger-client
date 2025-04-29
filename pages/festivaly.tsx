import type { NextPage } from 'next'

import BlockContent from 'components/BlockContent'
import Galery from 'components/Galery'
import Head from 'components/Head'
import Lineup from 'components/Lineup'
import { filterEvents } from 'helpers/filterEvents'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { useTranslations } from 'next-intl'
import { festivalsPageQuery, festivalsQuery } from 'queries/festivals'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: festivalsPageQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const { data: festivalsData } = await client.query({
    query: festivalsQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const festivalPage = data.festivalsPage.data.attributes
  const festivals = festivalsData.festivals.data.map((item: any) => item.attributes)

  store.dispatch(changeTitle(festivalPage.meta?.title || festivalPage.title))
  store.dispatch(changeDescription(festivalPage.meta?.description || 'Festivals'))

  return {
    props: {
      festivalPage,
      festivals,
      messages: (await import(`../messages/${ctx.locale}.json`)).default,
    },
  }
})

const Festival: NextPage<{ festivalPage: any; festivals: any }> = ({ festivalPage, festivals }) => {
  const filteredFestivals = filterEvents(festivals)
  const t = useTranslations('global')

  return (
    <Page>
      <Head text={festivalPage.title} type={'h1'} />
      <BlockContent content={festivalPage.content} />
      {!!filteredFestivals.future.length && (
        <Lineup head={t('upcomingEvents')} data={filteredFestivals.future} hp />
      )}
      {!!filteredFestivals.old.length && (
        <Lineup head={t('alreadyTaken')} data={filteredFestivals.old} hp />
      )}
      <BlockContent head={festivalPage.title2} content={festivalPage.content2} />
      {!!festivalPage.galery?.data?.length && <Galery images={festivalPage.galery} />}
    </Page>
  )
}

export default Festival
