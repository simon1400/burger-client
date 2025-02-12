import type { NextPage } from 'next'

import VotesThankYou from 'layout/votes/VotesThankYou'

export const getServerSideProps = async () => {
  return {
    props: {
      votes: true,
    },
  }
}

const Dekujem: NextPage = () => <VotesThankYou />

export default Dekujem
