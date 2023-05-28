import BlockContent from "components/BlockContent"
import Lineup from "components/Lineup"
import FacebookEvent from "components/FacebookEvent"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container, Grid } from "@mui/material"
import Winner from "components/Winner"
import Galery from "components/Galery"
import Winners from "components/Winners"

const Festival: NextPage = () => {
  return (
    <Page>
      <Head />
      <BlockContent time content />
      <FacebookEvent single />
      <Lineup />
      <Winners />
      <Lineup />
      <Galery />
    </Page>
  )
}

export default Festival