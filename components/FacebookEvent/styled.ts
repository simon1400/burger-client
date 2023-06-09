import styled from "@emotion/styled";
import Link from "next/link";

export const FacebookEventS = styled(Link)<{single: boolean}>(({theme, single}) => `
  display: flex;
  margin-right: ${single ? "0" : "40px"};
  margin-top: ${single ? "40px" : "0px"};
  margin-bottom: ${single ? "80px" : "0px"};
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  justify-content: center;
  transition: all .2s ease;
  svg{
    margin-right: 7px;
  }
  &:hover{
    color: white;
  }
  ${theme.breakpoints.down("md")} {
    margin-right: ${single ? "0" : "10px"};
    span{
      display: none;
    }
  }
`)