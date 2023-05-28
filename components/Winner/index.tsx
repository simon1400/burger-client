import { ImgCircle } from "styles/ImgCircle"
import { WinnerS } from "./styled"
import Image from "next/image"
import { Typography } from "@mui/material"

const Winner = () => {
  return (
    <WinnerS>
      <ImgCircle>
        <Image src={"/img/winner.webp"} fill alt="" />
      </ImgCircle>
      <Typography>1. místo</Typography>
      <b>Pablo Escobar</b>
    </WinnerS>
  )
}

export default Winner