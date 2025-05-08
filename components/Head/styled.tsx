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
      background-color: rgb(240, 189, 19);
      display: inline-block;
      margin-top: 0;
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
  .red-bg{
    svg{
      width: 441px;
      height: 137px;
    }
  }
  .yellow1-bg{
    
    svg{
      width: 326px;
      height: 96px;
      
    }
  }
  .yellow2-bg{
    svg{
      width: 328px;
      height: 93px;
    }
  }
  .purple-bg{
    svg{
      width: 372px;
      height: 93px;
    }
  }
  ${theme.breakpoints.down('md')} {
    .red-bg{
      svg{
        width: 270px;
        height: 108px;
      }
    }
    .yellow1-bg{
      svg{
        width: 208px;
        height: 61px;
      }
    }
    .yellow2-bg{
      svg{
        width: 227px;
        height: 65px;
      }
    }
    .purple-bg{
      svg{
        width: 250px;
        height: 88px;
      }
    }
    
    h1{
      font-size: 42px;
      line-height: 42px;
      padding-left: 25px;
      padding-right: 25px;
    }
    h2{
      font-size: 30px;
      line-height: 31px;
    }
    h3{
      font-size: 24px;
      line-height: 25px;
    }
    h4{
      font-size: 19px;
      line-height: 20px;
    }
    h5{
      font-size: 17px;
      line-height: 18px;
    }
  }
`,
)
