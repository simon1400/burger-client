import { Container } from "@mui/material"
import { FooterBottomS } from "./styled"
import Link from "next/link"
import { FC } from "react"

const FooterBottom: FC<{phone: string, email: string}> = ({phone, email}) => {
  return (
    <Container maxWidth="xl">
      <FooterBottomS>
        <div>
          <Link href={`mailto:${email}`}>{email}</Link>
          <Link href={`tel:${phone}`}>{phone}</Link>
        </div>
        <div>
          <div><Link href="/clanek/kariera">kariéra</Link></div>
          <div><Link href="/">nastavení cookies</Link></div>
        </div>
      </FooterBottomS>
    </Container>
  )
}

export default FooterBottom