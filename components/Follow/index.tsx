import type { FC } from 'react'

import { Typography } from '@mui/material'
import Link from 'next/link'
import FacebookIcon from 'public/img/facebook-f.svg'
import InstagramIcon from 'public/img/instagram.svg'

import { FollowS } from './styled'

const Follow: FC<{ data: any }> = ({ data }) => {
  return (
    <FollowS>
      <Typography variant={'h3'}>{'Sledujte nás'}</Typography>
      <ul>
        {data.map((item: any, idx: number) => (
          <li key={idx} className={`soc-${item.type}`}>
            <Link href={item.link} target={'_blank'}>
              {item.type === 'facebook' && <FacebookIcon />}
              {item.type === 'instagram' && <InstagramIcon />}
            </Link>
          </li>
        ))}
      </ul>
    </FollowS>
  )
}

export default Follow
