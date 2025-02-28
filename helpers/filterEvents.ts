import { beforeDate } from './beforeDate'
import { sortDate } from './sortDate'

export const filterEvents = (arr: any) => {
  const future: any = []
  const old: any = []
  const sortArr = sortDate(arr).reverse()
  // eslint-disable-next-line array-callback-return
  sortArr.map((item: any) => {
    if (beforeDate(item.to)) {
      future.push(item)
    } else {
      old.push(item)
    }
  })
  return {
    future,
    old,
  }
}
