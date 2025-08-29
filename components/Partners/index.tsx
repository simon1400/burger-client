import type { FC } from 'react'

import { Container, Grid } from '@mui/material'
import Head from 'components/Head'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import PurpleBackground from 'public/img/backgrounds/footerPurple.svg'

import { LogoWrap, PartnersS } from './styled'

const APP_API = process.env.APP_API

const Partners: FC<{ data: any }> = ({ data }) => {
  const t = useTranslations('global')

  return (
    <PartnersS>
      <Container>
        <div className={'footer-bg-purple'}>
          <PurpleBackground />
        </div>
        <Head className={'footer-head'} text={t('partners')} type={'h2'} bg={'yellow1'} />
        <Grid container spacing={2} justifyContent={'center'}>
          {data.map((item: any, idx: number) => (
            <Grid key={idx} item xs={4} md={2}>
              <LogoWrap>
                <Image
                  src={`${APP_API + item.attributes.url}?format=webp&resize=300x200`}
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
