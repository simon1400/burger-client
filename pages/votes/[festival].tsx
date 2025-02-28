/* eslint-disable array-callback-return */
import type { NextPage } from 'next'

import VotesFestival from 'layout/votes/Festival'
import { client } from 'lib/api'
import { getFestival } from 'queries/festivals'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: getFestival,
    variables: {
      slug: ctx.params?.festival,
      locale: ctx.locale,
    },
  })

  const festivalLinup = data.festivals.data[0].attributes.lineup.data
  const idFestival = data.festivals.data[0].id
  const festivalBurgers: any = []

  festivalLinup.map((item: any) => {
    item.attributes.category.data.map((categoryItem: any) => {
      if (categoryItem.attributes.title === 'Burgrárna') {
        festivalBurgers.push(item)
      }
    })
  })

  const transformFestivalBurgers = festivalBurgers.map((item: any) => ({
    label: item.attributes.title,
    disabled: false,
  }))

  store.dispatch(changeTitle('Hlasování'))
  store.dispatch(changeDescription('Hlasování'))

  return {
    props: {
      festivalBurgers: transformFestivalBurgers,
      votes: true,
      idFestival,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
})

const Votes: NextPage<{
  festivalBurgers: any
  idFestival: number
}> = (props) => <VotesFestival {...props} />

export default Votes
