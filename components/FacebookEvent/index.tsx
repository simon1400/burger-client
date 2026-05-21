import type { FC } from 'react'

import { useTranslations } from 'next-intl'

import { FacebookEventS } from './styled'

const FacebookEvent: FC<IFacebookEvent> = ({ single = false, data }) => {
  const t = useTranslations('global')
  return (
    <FacebookEventS single={single} href={data} target={'_blank'} className={'soc-events'}>
      <span className={'content'}>
        <img src={'/img/facebook.svg'} alt={''} aria-hidden={'true'} />
        <span className={'label'}>{t('event')}</span>
      </span>
    </FacebookEventS>
  )
}

export default FacebookEvent
