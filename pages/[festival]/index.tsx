import type { NextPage } from 'next'

import BlockContent from 'components/BlockContent'
import CalendarEvent from 'components/CalendarEvent'
import FacebookEvent from 'components/FacebookEvent'
import Galery from 'components/Galery'
import Head from 'components/Head'
import Lineup from 'components/Lineup'
import Winners from 'components/Winners'
import { beforeDate } from 'helpers/beforeDate'
import Page from 'layout/Page'
import { getClient } from 'lib/api'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { getFestival } from 'queries/festivals'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await getClient().query({
    query: getFestival,
    variables: {
      slug: ctx.params?.festival,
      locale: ctx.locale,
    },
  })

  if (!data.festivals.data.length) {
    return {
      notFound: true,
    }
  }

  const festival = data.festivals.data[0].attributes

  store.dispatch(changeTitle(festival.meta?.title || festival.title))
  store.dispatch(changeDescription(festival.meta?.description || ''))

  return {
    props: {
      festival,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
})

const Festival: NextPage<{ festival: IFestival }> = ({ festival }) => {
  const t = useTranslations('global')
  const router = useRouter()
  const slug = typeof router.query.festival === 'string' ? router.query.festival : ''
  const upcoming = beforeDate(festival.to)
  return (
    <Page>
      <Head text={festival.title} type={'h1'} bg={'red'} />
      <BlockContent
        time={{ from: festival.from, to: festival.to }}
        head={festival.place}
        bg={'yellow1'}
        content={festival.content}
      />
      {upcoming && <BlockContent content={festival.contentBefore} />}
      {!upcoming && <BlockContent content={festival.contentAfter} />}
      {upcoming && slug && <CalendarEvent slug={slug} single />}
      {festival.social && <FacebookEvent single data={festival.social} />}
      {!!festival.lineup.data.length && (
        <Lineup
          head={'Lineup'}
          data={festival.lineup.data.map((item: any) => item.attributes)}
          modal
        />
      )}
      <Winners
        winner1={festival.winner1}
        winner2={festival.winner2}
        winner3={festival.winner3}
        margin
      />
      {!!festival.vouchers.length && <Lineup head={t('voucherWinners')} data={festival.vouchers} />}
      {!!festival.galery.data?.length && <Galery images={festival.galery} />}
    </Page>
  )
}

export default Festival
