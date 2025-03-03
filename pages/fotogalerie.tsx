import type { NextPage } from 'next'

import BlockContent from 'components/BlockContent'
import Galery from 'components/Galery'
import Head from 'components/Head'
import { sortDate } from 'helpers/sortDate'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { festivalsGaleryQuery } from 'queries/festivals'
import { getMetaGalery } from 'queries/meta'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: festivalsGaleryQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const { data: metaData } = await client.query({
    query: getMetaGalery,
    variables: {
      locale: ctx.locale,
    },
  })

  const galeryData = data.festivals.data.map((item: any) => item.attributes)
  const meta = metaData.global.data.attributes.metaGalery

  store.dispatch(changeTitle(meta?.title || 'Fotogalerie'))
  store.dispatch(changeDescription(meta?.description || 'Fotogalerie'))

  return {
    props: {
      galeryData: sortDate(galeryData),
      messages: (await import(`../messages/${ctx.locale}.json`)).default,
    },
  }
})

const GaleryPage: NextPage<{ galeryData: any }> = ({ galeryData }) => {
  return (
    <Page>
      {galeryData.map((item: any, idx: number) => {
        if (item.galery.data?.length) {
          return (
            <div key={item.title}>
              <Head data={item.title} />
              <BlockContent time={{ from: item.from, to: item.to }} head={item.place} />
              <Galery removePadding images={item.galery} />
              <CenterWrap marginBottom={100} />
            </div>
          )
        } else {
          return null
        }
      })}
    </Page>
  )
}

export default GaleryPage
