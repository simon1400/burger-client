import type { VotesFestival } from 'helpers/votesSlots'

import { getVotesSlots } from 'helpers/votesSlots'
import { getClient } from 'lib/api'
import { festivalsPageQuery, festivalsQuery } from 'queries/festivals'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

interface FestivalsQueryData {
  festivals: { data: { attributes: VotesFestival }[] }
}

interface FestivalsPageQueryData {
  festivalsPage: {
    data: { attributes: { votesIntroContent?: string | null } | null } | null
  } | null
}

export interface VotesIntroPageProps {
  festival: VotesFestival | null
  votesIntroContent: string | null
}

/**
 * getServerSideProps for the generic /votes (slot 0) and /votes2 (slot 1) intro pages,
 * see getVotesSlots for how festivals are assigned to slots.
 */
export const getVotesIntroProps = (slot: number) =>
  wrapper.getServerSideProps((store) => async (ctx) => {
    const [{ data }, { data: pageData }] = await Promise.all([
      getClient().query<FestivalsQueryData>({
        query: festivalsQuery,
        variables: { locale: ctx.locale },
      }),
      getClient().query<FestivalsPageQueryData>({
        query: festivalsPageQuery,
        variables: { locale: ctx.locale },
      }),
    ])

    const festivals = data.festivals.data.map((item) => item.attributes)
    const festival = getVotesSlots(festivals)[slot] ?? null

    // Only one festival this weekend: send /votes2 QR codes to the single running one.
    if (!festival && slot > 0) {
      return { redirect: { destination: '/votes', permanent: false } }
    }

    store.dispatch(changeTitle('Votes'))
    store.dispatch(changeDescription(''))

    return {
      props: {
        festival,
        votesIntroContent: pageData.festivalsPage?.data?.attributes?.votesIntroContent ?? null,
        votes: true,
        messages: (await import(`../messages/${ctx.locale}.json`)).default,
      },
    }
  })
