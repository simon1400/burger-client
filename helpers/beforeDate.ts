import isBefore from 'date-fns/isBefore'
import { parseDate } from './parseDate'

export const beforeDate = (endDate: string) => {
  const parse = parseDate(endDate)
  return isBefore(new Date(), new Date(parse.year, parse.month, parse.day))
}