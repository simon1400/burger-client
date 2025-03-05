/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { NextPage } from 'next'

import { Container, Grid, Typography } from '@mui/material'
import ContactItem from 'components/ContactItem'
import ContactLine from 'components/ContactLine'
import Head from 'components/Head'
import Page from 'layout/Page'
import { client } from 'lib/api'
import Envelope from 'public/img/envelope-regular.svg'
import Phone from 'public/img/phone-solid.svg'
import contactQuery from 'queries/contact'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'
import { CenterWrap } from 'styles/CenterWrap'
import { ContactLines } from 'styles/ContactLines'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: contactQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const contact = data.contact.data.attributes

  store.dispatch(changeTitle(contact.meta?.title || contact.title))
  store.dispatch(changeDescription(contact.meta?.description || ''))

  return {
    props: {
      contact,
      messages: (await import(`../messages/${ctx.locale}.json`)).default,
    },
  }
})

const Contact: NextPage<{ contact: any }> = ({ contact }) => {
  return (
    <Page>
      <Head data={contact.title} />
      <Container>
        <CenterWrap>
          <Typography
            component={'div'}
            dangerouslySetInnerHTML={{
              __html: contact.content.replace(
                /\/uploads/g,
                'https://burger-strapi.hardart.cz/uploads',
              ),
            }}
          />
          <ContactLines>
            {contact.phone && (
              <ContactLine icon={<Phone />} title={contact.phone} link={`tel:${contact.phone}`} />
            )}
            {contact.email && (
              <ContactLine
                icon={<Envelope />}
                title={contact.email}
                link={`mailto:${contact.email}`}
              />
            )}
          </ContactLines>
        </CenterWrap>
      </Container>
      <Container>
        <Grid container justifyContent={'center'}>
          <Grid item xs={12}>
            <ContactItem data={contact.item[0]} />
          </Grid>
          {contact.item.slice(1, contact.item.length).map((item: any, idx: number) => (
            <Grid key={idx} item xs={12} md={4}>
              <ContactItem data={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container>
        <CenterWrap>
          <Typography variant={'h2'} marginTop={10}>
            {contact.title2}
          </Typography>
          <Typography
            marginBottom={15}
            component={'div'}
            dangerouslySetInnerHTML={{
              __html: contact.content2.replace(
                /\/uploads/g,
                'https://burger-strapi.hardart.cz/uploads',
              ),
            }}
          />
        </CenterWrap>
      </Container>
    </Page>
  )
}

export default Contact
