import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { CenterWrap } from "styles/CenterWrap"
import { Container, Grid, Typography } from "@mui/material"
import ContactLine from "components/ContactLine"
import { ContactLines } from "styles/ContactLines"
import Times from 'public/img/times.svg'
import ContactItem from "components/ContactItem"
import { wrapper } from "stores"
import { client } from "lib/api"
import contactQuery from "queries/contact"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: contactQuery,
    });

    const contact = data.contact.data.attributes;

    store.dispatch(changeTitle(contact.meta?.title || 'Kontakt'))
    store.dispatch(changeDescription(contact.meta?.description || ''))

    return {
      props: {
        contact,
      }
    };
  }
);

const Contact: NextPage<{contact: any}> = ({contact}) => {
  return (
    <Page>
      <Head data={contact.title}/>
      <Container>
        <CenterWrap>
          <Typography component="div" dangerouslySetInnerHTML={{__html: contact.content}} />
          <ContactLines>
            <ContactLine icon={<Times />} title={contact.phone} link={`tel:${contact.phone}`} />
            <ContactLine icon={<Times />} title={contact.email} link={`mailto:${contact.email}`} />
          </ContactLines>
        </CenterWrap>
      </Container>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <ContactItem data={contact.item[0]} />
          </Grid>
          {contact.item.slice(1, contact.item.length).map((item: any, idx: number) => <Grid key={idx} item xs={4}>
            <ContactItem data={item} />
          </Grid>)}
        </Grid>
      </Container>
      <Container>
        <CenterWrap>
          <Typography variant="h2" marginTop={10}>{contact.title2}</Typography>
          <Typography marginBottom={15} component="div" dangerouslySetInnerHTML={{__html: contact.content2}} />
        </CenterWrap>
      </Container>
    </Page>
  )
}

export default Contact