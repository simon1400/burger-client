import type { FC, ReactNode } from 'react'

import BurgerZoneLabel from 'components/BurgerZoneLabel'
import { burgerZoneTextColor, normalizeHex, shadeHex } from 'helpers/burgerZone'

import { BurgerZoneThemeS } from './styled'

interface BurgerZoneThemeProps {
  enabled?: boolean | null
  color?: string | null
  textColor?: string | null
  children: ReactNode
}

const BurgerZoneTheme: FC<BurgerZoneThemeProps> = ({ enabled, color, textColor, children }) => {
  if (!enabled) {
    return <>{children}</>
  }

  const accent = normalizeHex(color)
  const accentText = burgerZoneTextColor(textColor)

  return (
    <BurgerZoneThemeS
      accent={accent}
      accentText={accentText}
      accentDark={shadeHex(accent, 0.5)}
      accentDarker={shadeHex(accent, 0.35)}
    >
      <div className={'burger-zone-stamp'}>
        <BurgerZoneLabel single color={accent} textColor={accentText} />
      </div>
      {children}
    </BurgerZoneThemeS>
  )
}

export default BurgerZoneTheme
