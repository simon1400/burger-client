import type { FC } from 'react'

import { Container, Grid, useMediaQuery } from '@mui/material'
import Head from 'components/Head'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import PurpleBackground from 'public/img/backgrounds/footerPurple.svg'

import { LogoWrap, PartnersS } from './styled'

const APP_API = process.env.APP_API

const Partners: FC<{ data: any }> = ({ data }) => {
  const mediaMd = useMediaQuery('(max-width: 940px)')

  const t = useTranslations('global')

  return (
    <PartnersS>
      <Container>
        <div className={'footer-bg-purple'}>
          <PurpleBackground />
        </div>
        <Head text={t('partners')} type={'h2'} bg={'yellow1'} />
        <Grid container spacing={mediaMd ? 10 : 25} justifyContent={'center'}>
          {data.map((item: any, idx: number) => (
            <Grid key={idx} item xs={6} md={3}>
              <LogoWrap>
                <Image
                  src={`${APP_API + item.attributes.url}?format=webp&resize=200x200`}
                  fill
                  alt={''}
                />
              </LogoWrap>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PartnersS>
  )
}

export default Partners
