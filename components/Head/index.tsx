import type { FC } from 'react'

import { Typography } from '@mui/material'
import Horizont from 'public/img/horizont.svg'

import { HeadS } from './styled'

const Head: FC<IHead> = ({ data }) => {
  return (
    <HeadS>
      <Typography variant={'h1'}>{data}</Typography>
      <Horizont />
    </HeadS>
  )
}

export default Head
