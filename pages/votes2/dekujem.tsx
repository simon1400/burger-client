import type { NextPage } from 'next'

import VotesThankYou from 'layout/votes/VotesThankYou'

export const getServerSideProps = async (ctx: any) => {
  return {
    props: {
      votes: true,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
}

const Dekujem: NextPage = () => <VotesThankYou />

export default Dekujem
