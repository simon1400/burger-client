import styled from "@emotion/styled";

export const FooterBottomS = styled.div(({theme}) => `
  display: flex;
  justify-content: space-between;
  padding-top: 115px;
  padding-bottom: 25px;
  > div:last-of-type{
    display: flex;
    >div{
      &:not(:last-of-type){
        margin-right: 20px;
      }
    }
  }
  a{
    color: white;
    text-decoration: none;
    font-size: 18px;
    position: relative;
    transition: all .2s ease;
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
      background: ${theme.palette.primary.main};
    }
    &:hover{
      color: ${theme.palette.primary.main};
    }
  }
  ${theme.breakpoints.down("md")} {
    padding-top: 45px;
    padding-bottom: 100px;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    > div{
      &:last-of-type{
        display: block;
        >div:not(:last-of-type){
          margin-right: 0px;
        }
      }
      a{
        margin-bottom: 12px;
        display: inline-block;
        width: auto;
        &:nth-of-type(2) {
          margin-left: 0px;
          margin-bottom: 35px;
        }
      }
    }
  }
`)