import VotesThankYou from "layout/votes/VotesThankYou"
import { NextPage } from "next"

export const getServerSideProps = (async () => {
  return { 
    props: { 
      votes: true
    } 
  }
})

const Dekujem: NextPage = () => <VotesThankYou />

export default Dekujem