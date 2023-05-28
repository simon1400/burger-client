import { Candal } from 'next/font/google';
export const candal = Candal({ weight: "400", subsets: ['latin'] });

export const baseHead = (theme: any) => ({
  fontWeight: "600",
  lineHeight: 1.19,
  fontFamily: candal.style.fontFamily,
  color: "white",
  "&::selection": {
    backgroundColor: theme.palette.primary.main,
  },
})