/* eslint-disable import/no-mutable-exports */
import type { Theme as MuiTheme, ThemeOptions } from '@mui/material/styles'
import type { IBorderRadius, IGlobalGap, IGlobalPadding } from './types'

import { createTheme } from '@mui/material'

import { components } from './components'
import { typography } from './typography'

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 640,
      md: 980,
      lg: 1200,
      xl: 1440,
      xxl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#d9291c',
    },
    text: {
      secondary: '#000000',
      primary: '#f5eceb',
    },
  },
  typography: {
    fontFamily: "'PT Mono', monospace",
  },
  spacing: 5,
})

const themeOption: ThemeOptions = {
  components: components(theme),
  typography: typography(theme),
}

theme = createTheme(theme, themeOption)

export default theme

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    borderRadius: IBorderRadius
    globalGap: IGlobalGap
    globalPadding: IGlobalPadding
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
  }
}
