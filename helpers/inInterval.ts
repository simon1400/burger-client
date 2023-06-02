import isWithinInterval from 'date-fns/isWithinInterval'
import { parseDate } from './parseDate';

export const InInterval = (startDate: string, endDate: string) => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  return isWithinInterval(new Date(), {
    start: new Date(+start.year, +start.month - 1, +start.day),
    end: new Date(+end.year, +end.month - 1, +end.day)
  })
}