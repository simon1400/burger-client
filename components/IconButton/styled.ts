import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { BURGER_ZONE_BLACK, BURGER_ZONE_YELLOW } from 'helpers/burgerZone'

export const ButtonS = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'black' && prop !== 'yellow',
})<{ black?: boolean; yellow?: boolean }>(
  ({ black = false, yellow = false }) => `
  border-radius: 24px;
  height: 40px;
  min-width: 40px;
  padding: 0;
  width: 40px;
  border: solid 4px rgba(217, 41, 28, 0.3);
  ${black ? 'background: black;' : ''}
  ${
    yellow
      ? `
  background: ${BURGER_ZONE_YELLOW};
  color: ${BURGER_ZONE_BLACK};
  border-color: rgba(240, 189, 19, 0.3);
  &:hover{
    background: ${BURGER_ZONE_YELLOW};
    filter: brightness(1.08);
  }
  `
      : ''
  }
`,
)
