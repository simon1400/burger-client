import Link from 'next/link'
import LogoIcon from 'public/img/burger-street-festival.svg'

const Logo = () => {
  return (
    <Link href="/">
      <LogoIcon />
    </Link>
  )
}

export default Logo