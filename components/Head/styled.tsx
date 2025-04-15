import styled from '@emotion/styled'

export const HeadS = styled.div(
  ({ theme }) => `
  text-align: center;
  position: relative;
  h1, h2, h3, h4, h5{
    font-family: 'veneer', sans-serif!important;
    text-transform: uppercase;
    
    &.black-color{
      color: #141414;
    }
    
  }

  h1{
    font-size: 86px;
    line-height: 87px;
    margin: 0;
    padding-left: 60px;
    padding-right: 60px;
  }
  h2{
    font-size: 46px;
    line-height: 47px;
  }
  h3{
    font-size: 36px;
    line-height: 37px;
  }
  h4{
    font-size: 29px;
    line-height: 30px;
  }
  h5{
    font-size: 24px;
    line-height: 25px;
  }
  svg{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  ${theme.breakpoints.down('md')} {
    svg{
      width: 150px;
      height: 13px;
    }
  }
`,
)
