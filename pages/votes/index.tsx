import type { NextPage } from 'next'

import { filterEvents } from 'helpers/filterEvents'
import Intro from 'layout/votes/Intro'
import { client } from 'lib/api'
import { festivalsQuery } from 'queries/festivals'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: festivalsQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const festivals = data.festivals.data.map((item: any) => item.attributes)
  const filteredFestivals = filterEvents(festivals)

  store.dispatch(changeTitle('Votes'))
  store.dispatch(changeDescription(''))

  return {
    props: {
      festivals: filteredFestivals.future[0],
      votes: true,
    },
  }
})

const Votes: NextPage<{ festivals: any }> = ({ festivals }) => (
  <Intro link={'votes'} festivals={festivals} />
)

export default Votes
