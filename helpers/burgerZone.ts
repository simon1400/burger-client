export const BURGER_ZONE_YELLOW = '#f0bd13'
export const BURGER_ZONE_BLACK = '#141414'

const HEX_RE = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

// Strapi validates the format, but older entries or manual DB edits may slip through.
export const normalizeHex = (hex?: string | null) => {
  const value = hex?.trim() || ''
  if (!HEX_RE.test(value)) {
    return BURGER_ZONE_YELLOW
  }
  if (value.length === 4) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`.toLowerCase()
  }
  return value.toLowerCase()
}

// Darkens the color towards black, e.g. 0.5 = half brightness.
export const shadeHex = (hex: string, factor: number) => {
  const n = Number.parseInt(normalizeHex(hex).slice(1), 16)
  const channel = (shift: number) =>
    Math.round(((n >> shift) & 255) * factor)
      .toString(16)
      .padStart(2, '0')
  return `#${channel(16)}${channel(8)}${channel(0)}`
}

export const burgerZoneTextColor = (value?: string | null) =>
  value === 'white' ? '#ffffff' : BURGER_ZONE_BLACK
