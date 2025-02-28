import type { FC } from 'react'

import { useTranslations } from 'next-intl'
import FacebookIcon from 'public/img/facebook.svg'

import { FacebookEventS } from './styled'

const FacebookEvent: FC<IFacebookEvent> = ({ single = false, data }) => {
  const t = useTranslations('global')
  return (
    <FacebookEventS single={single} href={data} target={'_blank'} className={'soc-events'}>
      <FacebookIcon />
      <span>{t('event')}</span>
    </FacebookEventS>
  )
}

export default FacebookEvent
