import { Container, Grid } from "@mui/material"
import { GaleryItem, GaleryS } from "./styled"
import Image from "next/image"
import { FC } from "react"

const grid = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <GaleryItem>
          <Image src="/img/img.webp" fill alt="" />
        </GaleryItem>
      </Grid>
      <Grid item xs={3}>
        <GaleryItem>
          <Image src="/img/img.webp" fill alt="" />
        </GaleryItem>
      </Grid>
      <Grid item xs={3}>
        <GaleryItem>
          <Image src="/img/img.webp" fill alt="" />
        </GaleryItem>
      </Grid>
      <Grid item xs={3}>
        <GaleryItem>
          <Image src="/img/img.webp" fill alt="" />
        </GaleryItem>
      </Grid>
    </Grid>
  )
}

const Galery: FC<IGalery> = ({
  modal = false
}) => {
  return (
    <GaleryS modal={modal}>
      {!modal ? <Container maxWidth="xl">{grid()}</Container> : grid()}
    </GaleryS>
  )
}

export default Galery