import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { CenterWrap } from "styles/CenterWrap"
import { Container, Grid, Typography } from "@mui/material"
import ContactLine from "components/ContactLine"
import { ContactLines } from "styles/ContactLines"
import Times from 'public/img/times.svg'
import ContactItem from "components/ContactItem"

const Contact: NextPage = () => {
  return (
    <Page>
      <Head />
      <Container>
        <CenterWrap>
          <Typography component="div"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Aliquam id dolor. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam</p></Typography>
          <ContactLines>
            <ContactLine icon={<Times />} link="tel:+420774048983" />
            <ContactLine icon={<Times />} link="tel:+420774048983" />
          </ContactLines>
        </CenterWrap>
      </Container>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <ContactItem />
          </Grid>
          <Grid item xs={4}>
            <ContactItem />
          </Grid><Grid item xs={4}>
            <ContactItem />
          </Grid><Grid item xs={4}>
            <ContactItem />
          </Grid><Grid item xs={4}>
            <ContactItem />
          </Grid><Grid item xs={4}>
            <ContactItem />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <CenterWrap>
          <Typography variant="h2" marginTop={10}>Hlavní partner</Typography>
          <Typography marginBottom={15}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Aliquam id dolor. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Maecenas lorem. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Morbi scelerisque luctus velit. Nulla est. Integer imperdiet lectus quis justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Maecenas sollicitudin. Aenean vel massa quis mauris vehicula lacinia. Integer pellentesque quam vel velit.</Typography>
        </CenterWrap>
      </Container>
    </Page>
  )
}

export default Contact