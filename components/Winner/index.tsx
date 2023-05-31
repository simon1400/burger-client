import { ImgCircle } from "styles/ImgCircle"
import { WinnerS } from "./styled"
import Image from "next/image"
import { Typography } from "@mui/material"
import { FC } from "react"

const APP_API = process.env.APP_API

const Winner: FC<{data: IWinner; place: string}> = ({data, place}) => {
  return (
    <WinnerS>
      <ImgCircle>
        <Image src={APP_API+data.data.attributes.image.data.attributes.url} fill alt="" />
      </ImgCircle>
      <Typography>{place}. místo</Typography>
      <b>{data.data.attributes.title}</b>
    </WinnerS>
  )
}

export default Winner