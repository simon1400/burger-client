import { Container, Grid, Typography, useMediaQuery } from "@mui/material"
import { LogoWrap, PartnersS } from "./styled"
import Image from "next/image"

const Partners = () => {

  const mediaMd = useMediaQuery("(max-width: 940px)")

  return (
    <PartnersS>
      <Container>
        <Typography variant="h3">Partneři festivalu</Typography>
        <Grid container spacing={mediaMd ? 10 : 25}>
          <Grid item xs={6} md={3}>
            <LogoWrap>
              <Image src={"/img/logo1.webp"} fill alt="" />
            </LogoWrap>
          </Grid>
          <Grid item xs={6} md={3}>
            <LogoWrap>
              <Image src={"/img/logo2.webp"} fill alt="" />
            </LogoWrap>
          </Grid>
          <Grid item xs={6} md={3}>
            <LogoWrap>
              <Image src={"/img/logo3.webp"} fill alt="" />
            </LogoWrap>
          </Grid>
          <Grid item xs={6} md={3}>
            <LogoWrap>
              <Image src={"/img/logo4.webp"} fill alt="" />
            </LogoWrap>
          </Grid>
        </Grid>
      </Container>
    </PartnersS>
  )
}

export default Partners