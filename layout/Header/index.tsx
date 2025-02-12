import { useQuery } from '@apollo/client'
import { Container, useMediaQuery } from '@mui/material'
import Logo from 'components/Logo'
import Nav from 'components/Nav'
import Hamburger from 'hamburger-react'
import { useRouter } from 'next/router'
import navTopQuery from 'queries/nav'
import { useEffect, useState } from 'react'

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
