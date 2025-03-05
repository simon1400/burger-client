import type { FC } from 'react'

import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { ImgCircle } from 'styles/ImgCircle'

import { ContactItemS } from './styled'

const APP_API = process.env.APP_API

const ContactItem: FC<IContactItem> = ({ data }) => {
  return (
    <ContactItemS>
      <ImgCircle>
        <Image
          src={`${APP_API + data.image.data.attributes.url}?format=webp&resize=210x210`}
          fill
          alt={''}
        />
      </ImgCircle>
      <Typography variant={'h3'}>{data.title}</Typography>
      <Typography>{data.function}</Typography>
      {data.email && <Link href={`mailto:${data.email}`}>{data.email}</Link>}
    </ContactItemS>
  )
}

export default ContactItem
