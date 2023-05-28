import BlockContent from "components/BlockContent"
import Lineup from "components/Lineup"
import FacebookEvent from "components/FacebookEvent"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container, Grid } from "@mui/material"
import Winner from "components/Winner"
import Galery from "components/Galery"

const GaleryPage: NextPage = () => {
  return (
    <Page>
      <Head />
      <BlockContent time />
      <Galery />
      <Head />
      <BlockContent time />
      <Galery />
    </Page>
  )
}

export default GaleryPage