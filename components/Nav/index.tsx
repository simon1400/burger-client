import Link from "next/link"
import { NavS } from "./styled"
import ChevronDown from 'public/img/chevron-up.svg'

const Nav = () => {
  return (
    <NavS>
      <ul>
        <li><Link href="/">Some item<ChevronDown /></Link></li>
        <li><Link href="/">Some item</Link></li>
        <li><Link href="/">Some item</Link></li>
        <li><Link href="/">Some item</Link></li>
        <li><Link href="/">Some item</Link></li>
      </ul>
    </NavS>
  )
}

export default Nav