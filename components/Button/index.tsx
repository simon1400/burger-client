import { FC } from "react"
import { ButtonS } from "./styled"
import { ButtonProps } from "@mui/material"

const Button: FC<ButtonProps> = ({variant = 'contained', children, ...rest}) => {
  return (
    <ButtonS variant={variant} {...rest}>
      {children}
    </ButtonS>
  )
}

export default Button