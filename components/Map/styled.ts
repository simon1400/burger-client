import styled from "@emotion/styled";

export const MapS = styled.section(({theme}) => `
  height: 713px;
  max-width: 100%;
  margin-bottom: 85px;
  margin-top: -30px;
  svg{
    max-width: 100%;
    >#BODY {
      g{
        display: none;
        cursor: pointer;
        rect{ 
          cursor: pointer;
        }
      }
    }
  }
  ${theme.breakpoints.down("md")} {
    height: auto;
    overflow-x: scroll;
    padding-top: 50px;
    svg{
      height: auto;
      width: 200%;
      max-width: none;
    }
  }
`)