/**
 * Helper function to build optimized image URLs from Strapi
 * SVG files are returned without optimization parameters
 * Other formats can be optimized with webp and resize parameters
 */
export function getOptimizedImageUrl(
  url: string,
  options?: {
    format?: 'webp'
    width?: number
    height?: number
    resize?: string
  }
): string {
  if (!url) return ''
  
  // Check if the file is an SVG
  const isSvg = url.toLowerCase().endsWith('.svg')
  
  // If it's an SVG, return the original URL without optimization
  if (isSvg) {
    return url
  }
  
  // For other image formats, apply optimization if options are provided
  if (!options) return url
  
  const params = new URLSearchParams()
  
  if (options.format) {
    params.append('format', options.format)
  }
  
  if (options.resize) {
    params.append('resize', options.resize)
  } else {
    if (options.width) {
      params.append('width', options.width.toString())
    }
    if (options.height) {
      params.append('height', options.height.toString())
    }
  }
  
  const queryString = params.toString()
  return queryString ? `${url}?${queryString}` : url
}
