import styled from '@emotion/styled'

export const FooterS = styled.footer(
  ({ theme }) => `
  margin-top: 60px;
  hr{
    height: 5px;
    border: none;
    background-image: url('/img/red-line.svg');
  }
`,
)
