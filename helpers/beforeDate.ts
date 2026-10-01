import isBefore from 'date-fns/isBefore'

import { parseDate } from './parseDate'

export const beforeDate = (endDate: string, now: Date = new Date()) => {
  const parse = parseDate(endDate)
  return isBefore(now, new Date(parse.year, parse.month, parse.day, 23, 59))
}
