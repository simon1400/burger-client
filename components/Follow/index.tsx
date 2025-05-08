import type { FC } from 'react'

import { Container } from '@mui/material'
import Head from 'components/Head'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import RedBackground from 'public/img/backgrounds/footerRed.svg'
import FacebookIcon from 'public/img/facebook-f.svg'
import InstagramIcon from 'public/img/instagram.svg'

import { FollowS } from './styled'

const Follow: FC<{ data: any }> = ({ data }) => {
  const t = useTranslations('global')
  return (
    <FollowS>
      <Container maxWidth={'xl'}>
        <div className={'footer-bg-red'}>
          <RedBackground />
        </div>
        <Head className={'footer-head'} text={t('follow')} type={'h2'} bg={'yellow2'} />
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
      </Container>
    </FollowS>
  )
}

export default Follow
