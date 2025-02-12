import type { FC } from 'react'

import { Container, Grid, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'

import { LogoWrap, PartnersS } from './styled'

const APP_API = process.env.APP_API

const Partners: FC<{ data: any }> = ({ data }) => {
  const mediaMd = useMediaQuery('(max-width: 940px)')

  return (
    <PartnersS>
      <Container>
        <Typography variant={'h3'}>{'Partneři festivalu'}</Typography>
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
