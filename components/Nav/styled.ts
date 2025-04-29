import styled from '@emotion/styled'
import { candal } from 'styles/typography/baseHead'

export const NavS = styled.nav(
  ({ theme }) => `
  >ul{
    >li{
      display: inline-block;
      &:not(:first-of-type) {
        margin-left: 15px;
      }
      &:not(:last-of-type) {
        margin-right: 15px;
      }
      &.active-url{
        a{
          &:after{
            display: block;
          }
        }
      }
      a{
        color: white;
        text-decoration: none;
        font-size: 16px;
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
          background-color: black;
        }
        &:hover{
          color: black;
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
      &.dropdown-parent{
        position: relative;
        &:hover{
          .dropdown{
            display: block;
          }
        }
        .dropdown{
          position: absolute;
          display: none;
          padding-top: 20px;
          min-width: 176px;
          right: 50%;
          transform: translateX(50%);
          ul{
            background: #141414;
            border: 1px solid ${theme.palette.primary.main};
            padding: 10px 0;
            li{   
              a{
                color: white;
                text-decoration: none;
                padding: 9px 30px;
                font-family: ${candal.style.fontFamily};
                text-align: center;
                display: block;
                width: 100%;
                &:hover{
                  color: ${theme.palette.primary.main};
                }
              }
            }
          }
        }
      }
    }
  }
  ${theme.breakpoints.down('lg')} {
    ul{
      li{
        a{
          font-size: 14px!important;
        }
      }
    }
  }
  @media(max-width: 1100px) {
    ul{
      li{
        a{
          font-size: 24px!important;
        }
        &.dropdown-parent{
          position: relative;
          a{
            display: block;
          }
          
          &:hover{
            .dropdown{
              display: none;
            }
          }
          &.active{
            .dropdown{
              display: inline-block;
            }
          }
          .dropdown{
            position: relative;
            display: none;
            width: 200px;
            right: 0;
            transform: translateX(0);
          }
        }
      }
    }
  }
`,
)
