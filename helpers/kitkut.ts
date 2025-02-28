export const kitcut = (text: string, limit: number) => {
  text = text.trim()
  if (text.length <= limit) return text

  text = text.slice(0, limit)

  return `${text.trim()}...`
}
