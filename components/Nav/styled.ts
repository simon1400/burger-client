import styled from "@emotion/styled";
import { Menu } from "@mui/material";
import { candal } from "styles/typography/baseHead";

export const NavS = styled.nav(({theme}) => `
  ul{
    li{
      display: inline-block;
      &:not(:first-of-type) {
        margin-left: 15px;
      }
      &:not(:last-of-type) {
        margin-right: 15px;
      }
      a{
        color: white;
        text-decoration: none;
        font-size: 18px;
        font-family: ${candal.style.fontFamily};
        position: relative;
        transition: all .2s ease;
        &:after{
          content: '';
          display: none;
          width: 100%;
          height: 3px;
          left: 0;
          bottom: -5px;
          position: absolute;
          background-color: ${theme.palette.primary.main};
        }
        &:hover{
          color: ${theme.palette.primary.main};
          svg{
            transform: rotate(-180deg);
          }
        }
        svg{
          margin-left: 10px;
          transition: all .2s ease;
          transform-origin: center;
        }
        &.active-dropdown{
          color: ${theme.palette.primary.main};
          cursor: pointer;
          svg{
            transform: rotate(-180deg);
          }
        }
      }
    }
  }
`)


export const MenuS = styled(Menu)(({theme}) => `
  > .MuiPaper-root{
    padding-top: 20px;
    background: transparent;
  }
  ul{
    background: black;
    li{
      a{
        color: white;
        text-decoration: none;
      }
    }
  }
`)