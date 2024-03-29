import styled from "@emotion/styled";
import { RadioGroup } from "@mui/material";
import { candal } from "styles/typography/baseHead";

export const RadioS = styled(RadioGroup)(({theme}) => `
  margin-bottom: 20px;
  label{
    border-bottom: 4px dotted #5a5a5a;
    padding: 16px 0;
    &:last-of-type{
      border-bottom: none;
    }
    svg{
      fill: white;
    }
  }
  .label-wrap{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 18px;
    label{
      color: white;
      font-family: ${candal.style.fontFamily};
    }
    span{
      color: ${theme.palette.primary.main};
      padding-bottom: 10px
    }
  }
`)