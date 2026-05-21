import styled from '@emotion/styled'

export const EventActionsS = styled.div(
  ({ theme }) => `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 80px;
  ${theme.breakpoints.down('md')} {
    flex-direction: column;
    gap: 16px;
    margin-top: 30px;
    margin-bottom: 50px;
  }
`,
)
