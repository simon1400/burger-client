import Link from 'next/link'
import LogoIcon from 'public/img/logo.svg'

const Logo = () => {
  return (
    <Link href="/">
      <LogoIcon />
    </Link>
  )
}

export default Logo