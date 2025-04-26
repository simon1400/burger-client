import styled from '@emotion/styled'

export const HeaderS = styled.div(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  > a > svg{
    width: 205px;
    height: 200px;
    position: relative;
    z-index: 1001;
  }
  .hamburger-react{
    position: relative;
    z-index: 1001;
  }
  .header-bg-wrap{
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    top: -15px;
    max-width: 1600px;

    .header-bg{
      position: absolute;
      &.header-bg-2{
        left: 50%;
        transform: translateX(-50%);
      }
      &.header-bg-3{
        right: 0;
      }
    }
  }
  ${theme.breakpoints.down('md')} {
    > a > svg{
      width: 113px;
      height: 110px;
    }
    .header-bg-wrap{
      top: -25px;
      z-index: 1001;
      .header-bg{
        
        &.header-bg-1{
          left: -100px;
        }
        &.header-bg-2{
          left: 75%;
          transform: translateX(0);
        }
        &.header-bg-3{
          display: none;
        }
      }
    }
  }
`,
)

export const MobileNav = styled.div<{ open: boolean }>(
  ({ open }) => `
  position: absolute;
  height: ${open ? '100vh' : '0'};
  width: 100vw;
  overflow: hidden;
  top: 0;
  left: 0;
  background: black;
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
  }
`,
)
