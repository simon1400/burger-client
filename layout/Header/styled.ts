import styled from "@emotion/styled";

export const HeaderS = styled.div(({theme}) => `
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  /* ${theme.breakpoints.down('md')} {
    padding: 0px 0;
    svg{
      width: 136px;
    }
  } */
`)

export const MobileNav = styled.div<{open: boolean}>(({open}) => `
  /* position: absolute;
  height: ${open ? '100vh' : '0'};
  width: 100vw;
  overflow: hidden;
  top: 0;
  left: 0;
  background: white;
  z-index: 1000;
  display: flex;
  align-items: center;
  transition: all .2s ease;
  nav{
    width: 100%;
    padding-left: 15px;
    padding-right: 25px;
    ul{
      width: 100%;
      li{
        display: block;
        text-align: right;
        margin-right: 0!important;
        margin-left: 0!important;
        margin-bottom: 20px;
        a{
          font-size: 18px;
        }
      }
    }
  } */
`)