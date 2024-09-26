import { parseDate } from "./parseDate";

export const sortDate = (arr: any) => arr.sort((a: any, b: any) => {
  const parseA = parseDate(a.to || a.datePublication)
  const parseB = parseDate(b.to || b.datePublication)
  let dateA = new Date(parseA.year, parseA.month, parseA.day);
  let dateB = new Date(parseB.year, parseB.month, parseB.day);
  // @ts-ignore
  return dateB - dateA;
});