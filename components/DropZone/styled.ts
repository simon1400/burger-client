import styled from "@emotion/styled";
import { candal } from "styles/typography/baseHead";

export const DropzoneS = styled.div(({theme}) => `
  label{
    color: white;
    margin-bottom: 15px;
    display: block;
    font-family: ${candal.style.fontFamily};
    font-size: 18px;
  }
  span{
    display: block;
    text-align: right;
    font-size: 18px;
    margin-top: 15px;
  }
  .zone{
    border: 2px dashed ${theme.palette.primary.main};
    border-radius: 5px;
    text-align: center;
    height: 48px;
    p{
      font-size: 16px;
      margin-top: 0;
      margin-bottom: 0;
      line-height: 43px;
    }
  }
`)