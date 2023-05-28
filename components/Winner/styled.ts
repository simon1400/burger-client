import styled from "@emotion/styled";
import { candal } from "styles/typography/baseHead";

export const WinnerS = styled.div(({theme}) => `
  text-align: center;
  margin-bottom: 60px;
  p{
    font-size: 23px;
    margin-bottom: 0;
  }
  b{
    color: ${theme.palette.primary.main};
    font-family: ${candal.style.fontFamily};
    font-size: 23px;
  }
`)