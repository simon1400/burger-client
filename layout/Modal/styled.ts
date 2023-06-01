import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import { candal } from "styles/typography/baseHead";

export const ModalS = styled(Dialog)(({theme}) => `
  >div{
    >div{
      margin-top: 150px;
      overflow: visible;
    }
  }
`)

export const ModalWinners = styled.div(({theme}) => `
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  >div{
    text-align: center;
    &:not(:first-of-type) {
      margin-left: 50px;
    }
    &:not(:last-of-type) {
      margin-right: 50px;
    }
    b{
      color: ${theme.palette.primary.main};
      font-size: 46px;
      font-family: ${candal.style.fontFamily};
      display: block;
      margin-bottom: 5px;
    }
    span{
      font-size: 23px;
    }
  }
  ${theme.breakpoints.down("md")} {
    > div{
      text-align: center;
      &:not(:first-of-type) {
        margin-left: 15px;
      }
      &:not(:last-of-type) {
        margin-right: 15px;
      }
      b{
        font-size: 35px;
      }
      span{
        font-size: 17px;
      }
    }
  }
`)

export const ModalContentWrap = styled.div(({theme}) => `
  padding: 0 85px;
  h1{
    margin-bottom: 30px;
  }
  
  .logo-img{
    margin-top: -107px;
  }
  .labels-modal{
    justify-content: center;
    margin-bottom: 60px;
  }
  >ul{
    margin-top: 40px;
    margin-bottom: 65px;
    li{
      display: inline-block;
      &:not(:first-of-type) {
        margin-left: 20px;
      }
      &:not(:last-of-type) {
        margin-right: 20px;
      }
      a{
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        position: relative;
        transition: all 0.2s ease;
        font-size: 18px;
        &:after{
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: -3px;
          background: ${theme.palette.primary.main};
          width: 100%;
          height: 1.5px;
        }
        &:hover{
          color: ${theme.palette.primary.main};
        }
      }
    }
  }
  ${theme.breakpoints.down("md")} {
    padding: 0 15px;
    .logo-img{
      width: 160px;
      height: 160px;
      margin-top: -80px;
    }
    .labels-modal{
      margin-bottom: 30px;
    }
    >ul{
      margin-top: 25px;
      margin-bottom: 30px;
    }
  }
`)

export const ModalBody = styled.div(({theme}) => `
  padding: 0;
  text-align: center;
  background: #0d0d0d;
  .times-icon{
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
  }
`)