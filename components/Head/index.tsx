import { Typography } from "@mui/material"
import { HeadS } from "./styled"
import Horizont from 'public/img/horizont.svg'
import { FC } from "react"

const Head: FC<IHead> = ({
  data
}) => {
  return (
    <HeadS>
      <Typography variant="h1">{data}</Typography>
      <Horizont />
    </HeadS>
  )
}

export default Head