import { Typography } from "@mui/material"
import { FollowS } from "./styled"
import Link from "next/link"
import FacebookIcon from 'public/img/facebook-f.svg'
import InstagramIcon from 'public/img/instagram.svg'
import { FC } from "react"

const Follow: FC<{data: any}> = ({data}) => {
  return (
    <FollowS>
      <Typography variant="h3">Sledujte nás</Typography>
      <ul>
        {data.map((item: any, idx: number) => <li key={idx} className={`soc-${item.type}`}>
          <Link href={item.link}>
            {item.type === 'facebook' && <FacebookIcon />}
            {item.type === 'instagram' && <InstagramIcon />}
          </Link>
        </li>)}
      </ul>
    </FollowS>
  )
}

export default Follow