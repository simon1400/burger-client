import styled from '@emotion/styled'

export const PartnersS = styled.section(
  ({ theme }) => `
  padding-top: 120px;
  padding-bottom: 35px;
  text-align: center;
  .footer-head{
    margin-bottom: 80px;
    h2{
      margin-bottom: 0;
    }
  }
  ${theme.breakpoints.down('md')} {
    padding-top: 55px;
    padding-bottom: 35px;
  }
`,
)

export const LogoWrap = styled.div(
  ({ theme }) => `
  position: relative;
  height: 120px;
  img {
    object-fit: contain;
    object-position: center;
  }
  ${theme.breakpoints.down('md')} {
    height: 80px;
  }
`,
)
