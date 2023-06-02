import { beforeDate } from "./beforeDate"

export const filterEvents = (arr: any) => {
  const future: any = []
  const old: any = []
  arr.map((item: any) => {
    if(beforeDate(item.to)) {
      future.push(item)
    }else{
      old.push(item)
    }
  })
  return {
    future,
    old
  }
}