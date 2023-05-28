import { Typography } from "@mui/material"
import { HeadS } from "./styled"
import Horizont from 'public/img/horizont.svg'

const Head = () => {
  return (
    <HeadS>
      <Typography variant="h1">Burger Street Festivaly 2023</Typography>
      <Horizont />
    </HeadS>
  )
}

export default Head