import type { FC } from 'react'

import { BURGER_ZONE_BLACK, BURGER_ZONE_YELLOW } from 'helpers/burgerZone'

import { BurgerZoneLabelS } from './styled'

interface BurgerZoneLabelProps {
  single?: boolean
  color?: string
  textColor?: string
}

const BurgerZoneLabel: FC<BurgerZoneLabelProps> = ({
  single = false,
  color = BURGER_ZONE_YELLOW,
  textColor = BURGER_ZONE_BLACK,
}) => {
  return (
    <BurgerZoneLabelS single={single} bg={color} fg={textColor} className={'burger-zone-label'}>
      {'Burger Zone'}
    </BurgerZoneLabelS>
  )
}

export default BurgerZoneLabel
