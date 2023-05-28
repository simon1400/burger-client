import { Typography } from "@mui/material"
import { FollowS } from "./styled"
import Link from "next/link"
import FacebookIcon from 'public/img/facebook-f.svg'

const Follow = () => {
  return (
    <FollowS>
      <Typography variant="h3">Sledujte nás</Typography>
      <ul>
        <li>
          <Link href="/">
            <FacebookIcon />
          </Link>
        </li>
        <li>
          <Link href="/">
            <FacebookIcon />
          </Link>
        </li>
      </ul>
    </FollowS>
  )
}

export default Follow