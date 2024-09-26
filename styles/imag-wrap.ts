import styled from "@emotion/styled";

export const ImgWrap = styled.div(({theme}) => `
  position: relative;
  width: 100%;
  padding-top: 75%;
  overflow: hidden;
  img{
    object-fit: cover;
    object-position: center;
    width: 100%;
  }
  &:before {
    content: '';
    display: block;
    width: 300px;
    height: 200px;
    background: white;
    position: absolute;
    left: -210px;
    top: -60px;
    z-index: 2;
    transform: rotate(-70deg);
  }
  &:after {
    content: '';
    display: block;
    width: 300px;
    height: 200px;
    background: white;
    position: absolute;
    right: -210px;
    bottom: -60px;
    z-index: 2;
    transform: rotate(-70deg);
  }
  ${theme.breakpoints.down('md')} {
    &:before {
      top: -50px;
      transform: rotate(-75deg);
    }
    &:after {
      bottom: -50px;
      transform: rotate(-75deg);
    }
  }
  ${theme.breakpoints.down('sm')} {
    &:before {
      top: -140px;
      transform: rotate(-75deg);
    }
    &:after {
      bottom: -140px;
      transform: rotate(-75deg);
    }
  }
`)