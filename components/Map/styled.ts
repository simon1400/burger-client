import styled from "@emotion/styled";
import { BURGER_ZONE_BLACK, BURGER_ZONE_YELLOW } from "helpers/burgerZone";

export const MapS = styled.section(({theme}) => `
  height: 713px;
  max-width: 100%;
  margin-bottom: 85px;
  margin-top: -30px;
  svg{
    max-width: 100%;
    > #BODY {
      g{
        display: none;
        cursor: pointer;
        rect{ 
          cursor: pointer;
        }
        path {
          transition: all .2s ease;
        }
        &.burger-zone{
          path:nth-of-type(1){
            fill: ${BURGER_ZONE_YELLOW};
          }
          path:nth-of-type(2){
            fill: ${BURGER_ZONE_BLACK};
          }
        }
        &:hover{
          path:nth-of-type(1){
            fill: white;
          }
          path:nth-of-type(2){
            fill: ${theme.palette.primary.main};
          }
          path:not(:nth-of-type(1),:nth-of-type(2)){
            fill: ${theme.palette.primary.main};
          }
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