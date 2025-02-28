import { parseDate } from './parseDate'

export const sortDate = (arr: any) =>
  arr.sort((a: any, b: any) => {
    const parseA = parseDate(a.to || a.datePublication)
    const parseB = parseDate(b.to || b.datePublication)
    const dateA = new Date(parseA.year, parseA.month, parseA.day)
    const dateB = new Date(parseB.year, parseB.month, parseB.day)
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    return dateB - dateA
  })
