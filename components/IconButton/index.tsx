import type { ButtonProps } from '@mui/material'
import type { FC } from 'react'

import { ButtonS } from './styled'

const IconButton: FC<ButtonProps> = ({ variant = 'contained', children, ...rest }) => {
  return (
    <ButtonS variant={variant} {...rest}>
      {children}
    </ButtonS>
  )
}

export default IconButton
