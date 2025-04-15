import { useQuery } from '@apollo/client'
import { Container, useMediaQuery } from '@mui/material'
import Logo from 'components/Logo'
import Nav from 'components/Nav'
import Hamburger from 'hamburger-react'
import { useRouter } from 'next/router'
import navTopQuery from 'queries/nav'
import { useEffect, useState } from 'react'
import HeaderBgYellow from 'public/img/backgrounds/navYellow.svg'
import HeaderBgPurple from 'public/img/backgrounds/navPurple.svg'
import HeaderBgRed from 'public/img/backgrounds/navRed.svg'

import { HeaderS, MobileNav } from './styled'

const Header = () => {
  const { locale } = useRouter()

  const [nav, setNav] = useState([])
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
    }
  }, [loading])

  useEffect(() => {
    setOpen(false)
  }, [router])

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
        {!!nav.length && !mediaMd && <Nav data={nav} />}
        {mediaMd && <Hamburger toggled={isOpen} toggle={setOpen} />}
        {mediaMd && (
          <MobileNav open={isOpen}>
            <Nav data={nav} />
          </MobileNav>
        )}
      </HeaderS>
    </Container>
  )
}

export default Header
