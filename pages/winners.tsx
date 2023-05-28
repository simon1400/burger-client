import BlockContent from "components/BlockContent"
import Lineup from "components/Lineup"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import Winners from "components/Winners"

const WinnersPage: NextPage = () => {
  return (
    <Page>
      <Head />
      <BlockContent margin time />
      <Winners />
      <Lineup />
      <Head />
      <BlockContent margin time />
      <Winners />
      <Lineup />
    </Page>
  )
}

export default WinnersPage