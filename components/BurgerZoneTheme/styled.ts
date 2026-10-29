import styled from '@emotion/styled'

interface IBurgerZoneTheme {
  accent: string
  accentText: string
  accentDark: string
  accentDarker: string
}

// `&&` doubles the class so these overrides beat the child components' own emotion rules,
// which are inserted after this wrapper's styles.
export const BurgerZoneThemeS = styled('div', {
  shouldForwardProp: (prop) =>
    !['accent', 'accentText', 'accentDark', 'accentDarker'].includes(prop),
})<IBurgerZoneTheme>(
  ({ theme, accent, accentText, accentDark, accentDarker }) => `
  && {
    .burger-zone-stamp{
      position: relative;
      z-index: 1;
      text-align: center;
      margin-bottom: 4px;
      ${theme.breakpoints.down('md')} {
        margin-bottom: 10px;
      }
    }
    .red-bg svg path{
      fill: ${accentDark};
    }
    .yellow1-bg svg path,
    .yellow2-bg svg path{
      fill: ${accent};
    }
    .black-color{
      color: ${accentText};
      background-color: ${accent};
    }
    .soc-events{
      background-color: ${accentDarker};
    }
    .events-list{
      .MuiButton-root{
        background: ${accent};
        color: ${accentText};
        &:hover{
          background: ${accent};
          filter: brightness(1.08);
        }
      }
      .lineup-title:hover,
      .lineup-title:hover time{
        color: ${accent};
      }
    }
    .winner-bg svg path{
      fill: ${accent};
    }
    .winner-bg + div{
      border-color: ${accent};
    }
    .mySwiper b{
      color: ${accent};
    }
  }
`,
)
