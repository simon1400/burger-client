import type { FC } from 'react'

import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ImgCircle } from 'styles/ImgCircle'

import { ContactItemS } from './styled'
import WinnerRed2Icon from '/public/img/backgrounds/winnerRed2.svg'
import WinnerRed3Icon from '/public/img/backgrounds/winnerRed3.svg'
import WinnerRedIcon from '/public/img/backgrounds/winnerRed.svg'

const APP_API = process.env.APP_API

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

const ContactItem: FC<IContactItem> = ({ data }) => {
  const [place, setPlace] = useState(0)

  useEffect(() => {
    setPlace(getRandomInt(3))
  }, [])
  return (
    <ContactItemS>
      <div className={'winner-bg'}>
        {place === 0 && <WinnerRedIcon />}
        {place === 1 && <WinnerRed2Icon />}
        {place === 2 && <WinnerRed3Icon />}
      </div>
      <ImgCircle>
        <Image
          src={`${APP_API + data.image.data.attributes.url}?format=webp&resize=300x300`}
          fill
          alt={data.title}
        />
      </ImgCircle>
      <Typography variant={'h3'}>{data.title}</Typography>
      <Typography>{data.function}</Typography>
      {data.email && <Link href={`mailto:${data.email}`}>{data.email}</Link>}
    </ContactItemS>
  )
}

export default ContactItem
