import type { FC } from 'react'

import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import FacebookIcon from 'public/img/facebook-f.svg'
import InstagramIcon from 'public/img/instagram.svg'

import { FollowS } from './styled'

const Follow: FC<{ data: any }> = ({ data }) => {
  const t = useTranslations('global')
  return (
    <FollowS>
      <Typography variant={'h3'}>{t('follow')}</Typography>
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
