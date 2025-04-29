import { baseBody } from './baseBody'
import { baseHead } from './baseHead'

export const typography = (theme: any) => ({
  body1: {
    ...baseBody(theme),
  },
  body2: {
    ...baseBody(theme),
  },
  h1: {
    fontSize: '63px',
    ...baseHead(theme),
    [theme.breakpoints.down('md')]: {
      fontSize: '36px',
    },
  },
  h2: {
    fontSize: '46px',
    ...baseHead(theme),
    [theme.breakpoints.down('md')]: {
      fontSize: '29px',
    },
  },
  h3: {
    fontSize: '34px',
    ...baseHead(theme),
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
    },
  },
  h4: {
    fontSize: '26px',
    ...baseHead(theme),
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
  },
  h5: {
    fontSize: '20px',
    ...baseHead(theme),
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
  },
})
