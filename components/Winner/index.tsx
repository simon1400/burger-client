import type { FC } from 'react'

import { Typography } from '@mui/material'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { changeModal } from 'stores/slices/stateSlices'
import { ImgCircle } from 'styles/ImgCircle'

import { WinnerS } from './styled'

const APP_API = process.env.APP_API

const Winner: FC<{ data: IWinner; place: string }> = ({ data, place }) => {
  const dispatch = useDispatch()
  const handleModal = (slug: string) => {
    dispatch(changeModal(slug))
  }
  return (
    <WinnerS onClick={() => handleModal(data.data.attributes.slug)}>
      <ImgCircle>
        <Image
          src={`${APP_API + data.data.attributes.image.data.attributes.url}?format=webp&resize=220x220`}
          fill
          alt={''}
        />
      </ImgCircle>
      <Typography>
        {place}
        {'. místo'}
      </Typography>
      <b>{data.data.attributes.title}</b>
    </WinnerS>
  )
}

export default Winner
