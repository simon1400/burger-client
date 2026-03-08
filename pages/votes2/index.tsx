import type { NextPage } from 'next'

import { filterEvents } from 'helpers/filterEvents'
import Intro from 'layout/votes/Intro'
import { client } from 'lib/api'
import { festivalsPageQuery, festivalsQuery } from 'queries/festivals'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: festivalsQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const { data: pageData } = await client.query({
    query: festivalsPageQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const festivals = data.festivals.data.map((item: any) => item.attributes)
  const filteredFestivals = filterEvents(festivals)
  const votesIntroContent = pageData.festivalsPage?.data?.attributes?.votesIntroContent ?? null

  store.dispatch(changeTitle('Votes'))
  store.dispatch(changeDescription(''))

  return {
    props: {
      festivals: filteredFestivals.future[1],
      votesIntroContent,
      votes: true,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
})

const Votes: NextPage<{ festivals: any; votesIntroContent?: string | null }> = ({
  festivals,
  votesIntroContent,
}) => <Intro link={'votes2'} festivals={festivals} votesIntroContent={votesIntroContent} />

export default Votes
