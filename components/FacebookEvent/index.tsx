import type { FC } from 'react'

import FacebookIcon from 'public/img/facebook.svg'

import { FacebookEventS } from './styled'

const FacebookEvent: FC<IFacebookEvent> = ({ single = false, data }) => {
  return (
    <FacebookEventS single={single} href={data} target={'_blank'} className={'soc-events'}>
      <FacebookIcon />
      <span>{'událost'}</span>
    </FacebookEventS>
  )
}

export default FacebookEvent
