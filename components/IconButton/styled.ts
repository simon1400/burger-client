import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const ButtonS = styled(Button)<{ black?: boolean }>(
  ({ black = false }) => `
  border-radius: 24px;
  height: 40px;
  min-width: 40px;
  padding: 0;
  width: 40px;
  border: solid 4px rgba(217, 41, 28, 0.3);
  ${black ? 'background: black;' : ''}
`,
)
