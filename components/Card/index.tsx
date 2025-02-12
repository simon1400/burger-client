import type { FC } from 'react'

import { Typography } from '@mui/material'
import Image from 'next/image'
import { ImgCard } from 'styles/ImgCard'
import { Price } from 'styles/Price'

import { CardS } from './styled'

const APP_API = process.env.APP_API

const Card: FC<{ data: any }> = ({ data }) => {
  return (
    <CardS href={`/obchod/${data.slug}`}>
      <ImgCard>
        <Image
          src={`${APP_API + data.image.data[0].attributes.url}?format=webp&resize=280x280`}
          fill
          alt={''}
        />
      </ImgCard>
      <Typography variant={'h4'} component={'h2'}>
        {data.title}
      </Typography>
      <Price>
        {data.price}
        {' Kč'}
      </Price>
    </CardS>
  )
}

export default Card
