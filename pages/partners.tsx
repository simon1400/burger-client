import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container, Grid, Typography } from "@mui/material"
import Button from "components/Button"
import { ImgCircle } from "styles/ImgCircle"
import Image from "next/image"
import { CenterWrap } from "styles/CenterWrap"
import { wrapper } from "stores"
import { client } from "lib/api"
import partnersQuery from "queries/partners"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: partnersQuery,
    });

    const partners = data.partner.data.attributes;

    store.dispatch(changeTitle(partners.meta?.title || 'Úvod'))
    store.dispatch(changeDescription(partners.meta?.description || ''))

    return {
      props: {
        partnersPage: partners
      }
    };
  }
);

const GaleryPage: NextPage<{partnersPage: any}> = ({
  partnersPage
}) => {

  const topPartnerLength = partnersPage.topPartners.data.length
  const partnerLength = partnersPage.partners.data.length
  const supportedLength = partnersPage.supported.data.length

  const getColumn = (count: number) => {
    return count === 1 ? 12 : count === 2 ? 6 : count === 3 ? 4 : 3;
  }

  return (
    <Page>
      <CenterWrap>
        <Head data={partnersPage.title} />
        <Container>
          <Typography marginBottom={10} component="div" dangerouslySetInnerHTML={{__html: partnersPage.content}}/>
          <Button href={partnersPage.button.link}>{partnersPage.button.text}</Button>
        </Container>
        <Container>
          <Typography variant="h2" marginTop={10}>{partnersPage.headTopPartner}</Typography>
          <Grid container justifyContent="center">
            {partnersPage.topPartners.data.map((item: any, idx: number) => <Grid key={idx} item xs={12} md={getColumn(topPartnerLength)}>
              <ImgCircle big={topPartnerLength < 4}>
                <Image src={APP_API+item.attributes.url} fill alt="" />
              </ImgCircle>
            </Grid>)}
          </Grid>
        </Container>
        <Container>
          <Typography variant="h2" marginTop={10}>{partnersPage.headPartner}</Typography>
          <Grid container justifyContent="center">
            {partnersPage.partners.data.map((item: any, idx: number) => <Grid key={idx} item xs={12} md={getColumn(partnerLength)}>
              <ImgCircle big={partnerLength < 4}>
                <Image src={APP_API+item.attributes.url} fill alt="" />
              </ImgCircle>
            </Grid>)}
          </Grid>
        </Container>
        <Container>
          <Typography variant="h2" marginTop={10}>{partnersPage.headSupport}</Typography>
          <Grid container justifyContent="center">
            {partnersPage.supported.data.map((item: any, idx: number) => <Grid key={idx} item xs={12} md={getColumn(supportedLength)}>
              <ImgCircle big={supportedLength < 4}>
                <Image src={APP_API+item.attributes.url} fill alt="" />
              </ImgCircle>
            </Grid>)}
          </Grid>
        </Container>
        <Container maxWidth="md">
          <Typography variant="h2" marginTop={10}>{partnersPage.title2}</Typography>
          <Typography marginBottom={15} component="div" dangerouslySetInnerHTML={{__html: partnersPage.content2}}/>
        </Container>
      </CenterWrap>
    </Page>
  )
}

export default GaleryPage