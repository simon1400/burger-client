import type { FC } from 'react'

import { getStrapiURL } from 'lib/api'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import CalendarIcon from 'public/img/calendar_icon.svg'

import { CalendarEventS } from './styled'

interface CalendarEventProps {
  slug: string
}

const CalendarEvent: FC<CalendarEventProps> = ({ slug }) => {
  const t = useTranslations('global')
  const { locale } = useRouter()
  const href = getStrapiURL(
    `/api/festivals/${encodeURIComponent(slug)}/ics?locale=${locale || 'en'}`,
  )

  return (
    <CalendarEventS href={href} className={'soc-events'}>
      <span className={'content'}>
        <CalendarIcon />
        <span className={'label'}>{t('saveToCalendar')}</span>
      </span>
    </CalendarEventS>
  )
}

export default CalendarEvent
