import { useQuery } from '@apollo/client'
// import { Container } from '@mui/material'
import Follow from 'components/Follow'
import FooterBottom from 'components/FooterBottom'
import Partners from 'components/Partners'
import { useRouter } from 'next/router'
import footerQuery from 'queries/footer'

import { FooterS } from './styled'

const Footer = () => {
  const router = useRouter()
  const { data, loading } = useQuery(footerQuery, {
    variables: {
      locale: router.locale,
    },
  })

  if (!data || loading) {
    return null
  }

  const footer = data.global.data.attributes

  return (
    <FooterS>
      {/* <Container maxWidth={'xl'}>
        <hr />
      </Container> */}
      {router.asPath === '/partneri' ? null : <Partners data={footer.logoPartners.data} />}
      <Follow data={footer.soc} />
      <FooterBottom email={footer.email} phone={footer.phone} lang={router.locale} />
    </FooterS>
  )
}

export default Footer
