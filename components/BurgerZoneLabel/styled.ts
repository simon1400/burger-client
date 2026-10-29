import styled from '@emotion/styled'

// Traced from the mockups (no designer *_bg.svg exists for this stamp yet):
// compact = notched left edge (event list), single = pointed right edge (festival detail).
const SHAPE_COMPACT = 'polygon(5.5% 3%, 95.5% 0%, 100% 100%, 10.5% 100%, 0% 52%)'
const SHAPE_SINGLE = 'polygon(0% 3%, 90% 0%, 100% 45%, 94% 100%, 3% 96%)'

export const BurgerZoneLabelS = styled('span', {
  shouldForwardProp: (prop) => !['single', 'bg', 'fg'].includes(prop),
})<{ single: boolean; bg: string; fg: string }>(
  ({ theme, single, bg, fg }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${single ? '70px' : '52px'};
  padding: ${single ? '0 50px 0 40px' : '0 22px 0 30px'};
  margin-right: ${single ? '0' : '16px'};
  color: ${fg};
  background-color: ${bg};
  -webkit-clip-path: ${single ? SHAPE_SINGLE : SHAPE_COMPACT};
  clip-path: ${single ? SHAPE_SINGLE : SHAPE_COMPACT};
  font-family: 'veneer', sans-serif;
  font-size: ${single ? '36px' : '24px'};
  letter-spacing: 0.02em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
  ${theme.breakpoints.down('md')} {
    height: ${single ? '48px' : '34px'};
    padding: ${single ? '0 34px 0 26px' : '0 12px 0 18px'};
    margin-right: ${single ? '0' : '10px'};
    font-size: ${single ? '24px' : '15px'};
  }
`,
)
