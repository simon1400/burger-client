import type { FC } from 'react'

import { GoogleMapsEventS } from './styled'

interface GoogleMapsEventProps {
  url: string
  label: string
}

const GoogleMapsEvent: FC<GoogleMapsEventProps> = ({ url, label }) => {
  return (
    <GoogleMapsEventS href={url} target={'_blank'} rel={'noopener noreferrer'} className={'soc-events'}>
      <span className={'content'}>
        <img src={'/img/google_icon.svg'} alt={''} aria-hidden={'true'} />
        <span className={'label'}>{label}</span>
      </span>
    </GoogleMapsEventS>
  )
}

export default GoogleMapsEvent
