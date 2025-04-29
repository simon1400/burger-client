import styled from '@emotion/styled'

export const ContactItemS = styled.div(
  ({ theme }) => `
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  p{
    font-size: 23px;
    margin-top: 5px;
  }
  a{
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 18px;
    position: relative;
    transition: all .2s ease;
    margin-top: 20px;
    display: inline-block;
    &:nth-of-type(2) {
      margin-left: 25px;
    }
    &:after{
      content: '';
      display: block;
      position: absolute;
      left: 0;
      width: 100%;
      height: 1.5px;
      background: #d9291c;
    }
    &:hover{
      color: #d9291c;
    }
  }
  /* ${theme.breakpoints.down('md')} {
    a{
      text-align: center;
    }
  } */
`,
)
