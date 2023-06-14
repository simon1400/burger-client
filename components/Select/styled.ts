import styled from "@emotion/styled";
import { candal } from "styles/typography/baseHead";

export const SelectS = styled.div(({theme}) => `
  margin-bottom: 20px;
  > * {
    display: block;
    border-bottom: 4px dotted #5a5a5a;
    padding: 16px 0;
    &:last-of-type{
      border-bottom: none;
    }
  }
  .label-wrap{
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    label{
      color: white;
      font-family: ${candal.style.fontFamily};
    }
    span{
      color: ${theme.palette.primary.main};
    }
  }
`)