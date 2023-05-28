import { Container, useMediaQuery } from "@mui/material"
import { FooterS } from "./styled"
import { useQuery } from "@apollo/client"
import footerQuery from "queries/footer"
import Partners from "components/Partners"
import Follow from "components/Follow"
import FooterBottom from "components/FooterBottom"

const Footer = () => {

  // const {data, loading} = useQuery(footerQuery)
  // const mediaMd = useMediaQuery("(max-width: 940px)")

  // if(loading) {
  //   return <></>
  // }

  // const footer = data.footer.data.attributes

  return (
    <FooterS>
      <Container maxWidth="xl"><hr /></Container>
      <Partners />
      <Follow />
      <FooterBottom />
    </FooterS>
  )
}

export default Footer