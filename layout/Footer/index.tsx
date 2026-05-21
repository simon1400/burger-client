import { useQuery } from '@apollo/client'
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
  const hideGlobalPartners =
    router.asPath === '/partneri' || router.pathname === '/[festival]'

  const partnerItems =
    footer.partnersFooter?.data
      ?.filter((p: any) => p.attributes.logo?.data)
      .map((p: any) => ({
        url: p.attributes.logo.data.attributes.url,
        link: p.attributes.link || undefined,
      })) ?? []

  return (
    <FooterS>
      {!hideGlobalPartners && <Partners items={partnerItems} />}
      <Follow data={footer.soc} />
      <FooterBottom email={footer.email} phone={footer.phone} lang={router.locale} />
    </FooterS>
  )
}

export default Footer
