import { useQuery } from '@apollo/client'
import { Container, useMediaQuery } from '@mui/material'
import Logo from 'components/Logo'
import Nav from 'components/Nav'
import Hamburger from 'hamburger-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeaderBgPurple from 'public/img/backgrounds/navPurple.svg'
import HeaderBgRed from 'public/img/backgrounds/navRed.svg'
import HeaderBgYellow from 'public/img/backgrounds/navYellow.svg'
import FacebookSocIcon from 'public/img/facebook_black_soc.svg'
import InstagramSocIcon from 'public/img/instagram_black_soc.svg'
import navTopQuery from 'queries/nav'
import { useEffect, useState } from 'react'

import { HeaderS, HeaderSoc, MobileNav } from './styled'

const Header = () => {
  const { locale } = useRouter()

  const [nav, setNav] = useState([])
  const [soc, setSoc] = useState<any[]>([])
  const [isOpen, setOpen] = useState(false)
  const { data, loading } = useQuery(navTopQuery, {
    variables: {
      locale,
    },
  })
  const mediaMd = useMediaQuery('(max-width: 1100px)')
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      setNav(data.nav.data.attributes.topNav)
      setSoc(data.global?.data?.attributes?.soc || [])
    }
  }, [loading])

  useEffect(() => {
    setOpen(false)
  }, [router])

  const renderSoc = () =>
    !!soc.length && (
      <HeaderSoc>
        {soc.map((item: any, idx: number) => (
          <li key={idx} className={`soc-${item.type}`}>
            <Link href={item.link} target={'_blank'} aria-label={item.type}>
              {item.type === 'facebook' && <FacebookSocIcon />}
              {item.type === 'instagram' && <InstagramSocIcon />}
            </Link>
          </li>
        ))}
      </HeaderSoc>
    )

  return (
    <Container maxWidth={'xl'}>
      <HeaderS>
        <div className={'header-bg-wrap'}>
          <div className={'header-bg header-bg-1'}>
            <HeaderBgYellow />
          </div>
          <div className={'header-bg header-bg-2'}>
            <HeaderBgPurple />
          </div>
          <div className={'header-bg header-bg-3'}>
            <HeaderBgRed />
          </div>
        </div>
        <Logo />
        {!!nav.length && !mediaMd && (
          <div className={'header-right'}>
            <Nav data={nav} />
            {renderSoc()}
          </div>
        )}
        {mediaMd && <Hamburger toggled={isOpen} toggle={setOpen} />}
        {mediaMd && (
          <MobileNav open={isOpen}>
            <Nav data={nav} />
            {renderSoc()}
          </MobileNav>
        )}
      </HeaderS>
    </Container>
  )
}

export default Header
