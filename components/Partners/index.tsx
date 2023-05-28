import { Container, Grid, Typography } from "@mui/material"
import { LogoWrap, PartnersS } from "./styled"
import Image from "next/image"

const Partners = () => {
  return (
    <PartnersS>
      <Container>
        <Typography variant="h3">Partneři festivalu</Typography>
        <Grid container spacing={25}>
          <Grid item xs={3}>
            <LogoWrap>
              <Image src={"/img/logo1.webp"} fill alt="" />
            </LogoWrap>
          </Grid>
          <Grid item xs={3}>
            <LogoWrap>
              <Image src={"/img/logo2.webp"} fill alt="" />
            </LogoWrap>
          </Grid>
          <Grid item xs={3}>
            <LogoWrap>
              <Image src={"/img/logo3.webp"} fill alt="" />
            </LogoWrap>
          </Grid>
          <Grid item xs={3}>
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