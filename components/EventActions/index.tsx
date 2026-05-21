import type { FC, ReactNode } from 'react'

import { EventActionsS } from './styled'

interface EventActionsProps {
  children: ReactNode
}

const EventActions: FC<EventActionsProps> = ({ children }) => {
  return <EventActionsS>{children}</EventActionsS>
}

export default EventActions
