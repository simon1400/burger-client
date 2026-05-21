import type { FC } from 'react'

import { getStrapiURL } from 'lib/api'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import CalendarIcon from 'public/img/calendar_icon.svg'

import { CalendarEventS, CalendarEventWrap } from './styled'

interface CalendarEventProps {
  slug: string
  single?: boolean
}

const CalendarEvent: FC<CalendarEventProps> = ({ slug, single = false }) => {
  const t = useTranslations('global')
  const { locale } = useRouter()
  const href = getStrapiURL(
    `/api/festivals/${encodeURIComponent(slug)}/ics?locale=${locale || 'en'}`,
  )

  return (
    <CalendarEventWrap single={single}>
      <CalendarEventS href={href} className={'soc-events'}>
        <span className={'content'}>
          <CalendarIcon />
          <span className={'label'}>{t('saveToCalendar')}</span>
        </span>
      </CalendarEventS>
    </CalendarEventWrap>
  )
}

export default CalendarEvent
