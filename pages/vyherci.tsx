import type { NextPage } from 'next'

import BlockContent from 'components/BlockContent'
import Button from 'components/Button'
import Head from 'components/Head'
import Lineup from 'components/Lineup'
import Winners from 'components/Winners'
import { sortDate } from 'helpers/sortDate'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { useTranslations } from 'next-intl'
import { festivalsWinnersQuery } from 'queries/festivals'
import { getMetaWinners } from 'queries/meta'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: festivalsWinnersQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const { data: metaData } = await client.query({
    query: getMetaWinners,
    variables: {
      locale: ctx.locale,
    },
  })

  const winners = data.festivals.data.map((item: any) => item.attributes)
  const meta = metaData.global.data.attributes.metaWinners

  store.dispatch(changeTitle(meta?.title || 'Výherci'))
  store.dispatch(changeDescription(meta?.description || ''))

  return {
    props: {
      winners: sortDate(winners),
      messages: (await import(`../messages/${ctx.locale}.json`)).default,
    },
  }
})

const WinnersPage: NextPage<{ winners: any }> = ({ winners }) => {
  const t = useTranslations('global')
  return (
    <Page>
      {winners.map((item: any, idx: number) => {
        if (item.winner1.data || item.winner2.data || item.winner3.data || item.vouchers.length) {
          return (
            <div key={item.title}>
              <Head data={item.title} />
              <BlockContent head={item.place} margin time={{ from: item.from, to: item.to }} />
              <CenterWrap marginBottom={80}>
                <Button href={`/${item.slug}`}>{t('detailEvent')}</Button>
              </CenterWrap>
              <Winners winner1={item.winner1} winner2={item.winner2} winner3={item.winner3} />
              {!!item.vouchers.length && <Lineup head={t('voucherWinners')} data={item.vouchers} />}
              <CenterWrap marginBottom={200} />
            </div>
          )
        } else {
          return null
        }
      })}
    </Page>
  )
}

export default WinnersPage
