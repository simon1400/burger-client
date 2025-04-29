import localFont from 'next/font/local'
export const candal = localFont({ src: '../../public/fonts/Candal.woff' })

export const baseHead = (theme: any) => ({
  lineHeight: 1.19,
  fontFamily: candal.style.fontFamily,
  color: 'white',
  '&::selection': {
    backgroundColor: theme.palette.primary.main,
  },
})
