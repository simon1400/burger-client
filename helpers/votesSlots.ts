import { beforeDate } from './beforeDate'
import { parseDate } from './parseDate'

export interface VotesFestival {
  from: string
  to: string
  slug: string
  title: string
  place?: string | null
  votesIntroContent?: string | null
}

const toTime = (date: string) => {
  const parse = parseDate(date)
  return new Date(parse.year, parse.month, parse.day).getTime()
}

const compare = (a: number, b: number) => a - b

/**
 * Festivals behind the generic /votes (index 0) and /votes2 (index 1) URLs.
 *
 * QR codes on the printed vote tickets point to these generic URLs, so the mapping must not
 * change while any festival of the current weekend is still running. Instead of indexing into
 * the list of not-yet-ended festivals (which shifts as soon as a one-day festival ends), we
 * "freeze" the whole group of festivals overlapping the current weekend, including those that
 * have already ended, and order it by static fields only.
 */
export const getVotesSlots = <T extends VotesFestival>(
  festivals: T[],
  now: Date = new Date(),
): T[] => {
  const items = festivals
    .filter((item) => item?.from && item?.to)
    .map((item) => ({ item, from: toTime(item.from), to: toTime(item.to) }))

  items.sort(
    (a, b) =>
      compare(a.from, b.from) || compare(a.to, b.to) || a.item.slug.localeCompare(b.item.slug),
  )

  const anchor = items.find(({ item }) => beforeDate(item.to, now))
  if (!anchor) {
    return []
  }

  const windowStart = anchor.from
  let windowEnd = anchor.to
  const overlapping = () => items.filter(({ from, to }) => from <= windowEnd && to >= windowStart)

  // Two passes: the second one catches festivals overlapping a longer member of the group.
  windowEnd = Math.max(...overlapping().map(({ to }) => to))
  const group = overlapping()

  group.sort(
    (a, b) =>
      compare(a.to, b.to) || compare(a.from, b.from) || a.item.slug.localeCompare(b.item.slug),
  )

  return group.map(({ item }) => item)
}
