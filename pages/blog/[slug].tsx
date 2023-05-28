import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container, Typography } from "@mui/material"
import Image from "next/image"
import { CenterWrap } from "styles/CenterWrap"
import LabelBare from "components/LabelBare"
import { ImgSquare } from "styles/ImgSquare"

const Blog: NextPage = () => {
  return (
    <Page>
      <Head />
      <Container>
        <CenterWrap>
          <LabelBare />
        </CenterWrap>
      </Container>
      <Container maxWidth="md">
        <Typography component="div"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Aliquam id dolor. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Maecenas lorem. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Morbi scelerisque luctus velit. Nulla est. Integer imperdiet lectus quis justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Maecenas sollicitudin. Aenean vel massa quis mauris vehicula lacinia. Integer pellentesque quam vel velit.</p></Typography>
        <Typography component="div"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Aliquam id dolor. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Maecenas lorem. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Morbi scelerisque luctus velit. Nulla est. Integer imperdiet lectus quis justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Maecenas sollicitudin. Aenean vel massa quis mauris vehicula lacinia. Integer pellentesque quam vel velit.</p></Typography>
      </Container>
      <Container maxWidth="xl">
        <ImgSquare>
          <Image src="/img/img.webp" fill alt="" />
        </ImgSquare>
      </Container>
    </Page>
  )
}

export default Blog