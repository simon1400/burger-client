import type { ButtonProps } from '@mui/material'
import type { FC } from 'react'

import { ButtonS } from './styled'

interface IIconButton extends ButtonProps {
  black?: boolean
}

const IconButton: FC<IIconButton> = ({
  variant = 'contained',
  children,
  black = false,
  ...rest
}) => {
  return (
    <ButtonS variant={variant} {...rest} black={black}>
      {children}
    </ButtonS>
  )
}

export default IconButton
