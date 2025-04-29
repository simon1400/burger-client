import type { FC } from 'react'

import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { changeModal } from 'stores/slices/stateSlices'
import { ImgCircle } from 'styles/ImgCircle'

import { WinnerS } from './styled'
import WinnerRed2Icon from '/public/img/backgrounds/winnerRed2.svg'
import WinnerRed3Icon from '/public/img/backgrounds/winnerRed3.svg'
import WinnerRedIcon from '/public/img/backgrounds/winnerRed.svg'

const APP_API = process.env.APP_API

const Winner: FC<{ data: IWinner; place: string }> = ({ data, place }) => {
  const t = useTranslations('global')
  const dispatch = useDispatch()
  const handleModal = (slug: string) => {
    dispatch(changeModal(slug))
  }
  return (
    <WinnerS onClick={() => handleModal(data.data.attributes.slug)}>
      <div className={'winner-bg'}>
        {place === '1' && <WinnerRedIcon />}
        {place === '2' && <WinnerRed2Icon />}
        {place === '3' && <WinnerRed3Icon />}
      </div>
      <ImgCircle>
        <Image
          src={`${APP_API + data.data.attributes.image.data.attributes.url}?format=webp&resize=220x220`}
          fill
          alt={''}
        />
      </ImgCircle>
      <Typography>
        {place}
        {`. ${t('place')}`}
      </Typography>
      <b>{data.data.attributes.title}</b>
    </WinnerS>
  )
}

export default Winner
