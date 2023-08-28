import isWithinInterval from 'date-fns/isWithinInterval'
import { parseDate } from './parseDate';
import { add } from 'date-fns';

export const InInterval = (startDate: string, endDate: string) => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  return isWithinInterval(new Date(), {
    start: new Date(start.year, start.month, start.day),
    end: new Date(end.year, end.month, end.day, 22)
  })
}