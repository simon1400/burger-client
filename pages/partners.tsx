import BlockContent from "components/BlockContent"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container, Grid, Typography } from "@mui/material"
import Galery from "components/Galery"
import Button from "components/Button"
import { ImgCircle } from "styles/ImgCircle"
import Image from "next/image"
import { CenterWrap } from "styles/CenterWrap"

const GaleryPage: NextPage = () => {
  return (
    <Page>
      <CenterWrap>
        <Head />
        <Container>
          <Typography marginBottom={10}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Aliquam id dolor. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam</Typography>
          <Button>stát se partnerem</Button>
        </Container>
        <Container>
          <Typography variant="h2" marginTop={10}>Hlavní partner</Typography>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <ImgCircle big>
                <Image src="/img/winner.webp" fill alt="" />
              </ImgCircle>
            </Grid>
            <Grid item xs={6}>
              <ImgCircle big>
                <Image src="/img/winner.webp" fill alt="" />
              </ImgCircle>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Typography variant="h2" marginTop={10}>Hlavní partner</Typography>
          <Grid container>
            <Grid item xs={3}>
              <ImgCircle>
                <Image src="/img/winner.webp" fill alt="" />
              </ImgCircle>
            </Grid>
            <Grid item xs={3}>
              <ImgCircle>
                <Image src="/img/winner.webp" fill alt="" />
              </ImgCircle>
            </Grid>
            <Grid item xs={3}>
              <ImgCircle>
                <Image src="/img/winner.webp" fill alt="" />
              </ImgCircle>
            </Grid>
            <Grid item xs={3}>
              <ImgCircle>
                <Image src="/img/winner.webp" fill alt="" />
              </ImgCircle>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Typography variant="h2" marginTop={10}>Hlavní partner</Typography>
          <Grid container>
            <Grid item xs={6}>
              <ImgCircle>
                <Image src="/img/winner.webp" fill alt="" />
              </ImgCircle>
            </Grid>
            <Grid item xs={6}>
              <ImgCircle>
                <Image src="/img/winner.webp" fill alt="" />
              </ImgCircle>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md">
          <Typography variant="h2" marginTop={10}>Hlavní partner</Typography>
          <Typography marginBottom={15}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Aliquam id dolor. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Maecenas lorem. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Morbi scelerisque luctus velit. Nulla est. Integer imperdiet lectus quis justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Maecenas sollicitudin. Aenean vel massa quis mauris vehicula lacinia. Integer pellentesque quam vel velit.</Typography>
        </Container>
      </CenterWrap>
    </Page>
  )
}

export default GaleryPage