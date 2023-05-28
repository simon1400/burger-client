import { Container } from "@mui/material"
import { FooterBottomS } from "./styled"
import Link from "next/link"

const FooterBottom = () => {
  return (
    <Container maxWidth="xl">
      <FooterBottomS>
        <div>
          <Link href="/">info@burgerstreetfestival.cz</Link>
          <Link href="/">+420 777 030 020</Link>
        </div>
        <div>
          <Link href="/">nastavení cookies</Link>
        </div>
      </FooterBottomS>
    </Container>
  )
}

export default FooterBottom