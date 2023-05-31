import { Container, Grid } from "@mui/material"
import { GaleryItem, GaleryS } from "./styled"
import Image from "next/image"
import { FC } from "react"

const APP_API = process.env.APP_API

const grid = (images: IImages) => {
  return (
    <Grid container>
      {images.data.map((item: IImageAttributes, idx: number) => <Grid key={idx} item xs={3}>
        <GaleryItem>
          <Image src={APP_API+item.attributes.url} fill alt="" />
        </GaleryItem>
      </Grid>)}
    </Grid>
  )
}

const Galery: FC<IGalery> = ({
  modal = false,
  images
}) => {
  return (
    <GaleryS modal={modal}>
      {!modal ? <Container maxWidth="xl">{grid(images)}</Container> : grid(images)}
    </GaleryS>
  )
}

export default Galery