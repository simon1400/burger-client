import type { VotesIntroPageProps } from 'lib/votesPage'
import type { NextPage } from 'next'

import Intro from 'layout/votes/Intro'
import { getVotesIntroProps } from 'lib/votesPage'

export const getServerSideProps = getVotesIntroProps(1)

const Votes: NextPage<VotesIntroPageProps> = ({ festival, votesIntroContent }) => (
  <Intro link={'votes2'} festival={festival} votesIntroContent={votesIntroContent} />
)

export default Votes
