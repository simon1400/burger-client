/* eslint-disable ts/ban-ts-comment */
import type { NextPage } from 'next'

import BlockContent from 'components/BlockContent'
import Button from 'components/Button'
import Galery from 'components/Galery'
import Head from 'components/Head'
import Events from 'components/Lineup'
import Map from 'components/Map'
import { filterEvents } from 'helpers/filterEvents'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { useTranslations } from 'next-intl'
import ArrowRight from 'public/img/arrowRight.svg'
import { festivalsQuery } from 'queries/festivals'
import homepageQuery from 'queries/homepage'
import mapQuery from 'queries/map'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: homepageQuery,
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

  const { data: mapData } = await client.query({
    query: mapQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const homepage = data.homepage.data.attributes
  const festivals = festivalsData.festivals.data.map((item: any) => item.attributes)
  const map = mapData.map.data.attributes

  store.dispatch(changeTitle(homepage.meta?.title || 'Úvod'))
  store.dispatch(changeDescription(homepage.meta?.description || ''))

  return {
    props: {
      homepage,
      festivals: filterEvents(festivals),
      map,
      locale: ctx.locale,
      messages: (await import(`../messages/${ctx.locale}.json`)).default,
    },
  }
})

const Homepage: NextPage<{
  homepage: IHomepage
  festivals: IFestivals
  map: any
  locale: string
}> = ({ homepage, festivals, map, locale }) => {
  const t = useTranslations('global')
  return (
    <Page>
      <Map data={map} />
      <Head text={homepage.title} type={'h1'} bg={'red'} />
      {/* @ts-expect-error */}
      <Events head={homepage.eventHead} data={festivals.future} hp />
      <CenterWrap marginBottom={80}>
        <Button href={locale === 'en' ? '/festivaly#old-festival' : '/festiwale#old-festival'}>
          {t('viewPastEvents')}
          <span className={'button-arrow'}>
            <ArrowRight />
          </span>
        </Button>
      </CenterWrap>
      <BlockContent head={homepage.title2} content={homepage.content} bg={'purple'} />
      <Galery images={homepage.galery} />
    </Page>
  )
}

export default Homepage
