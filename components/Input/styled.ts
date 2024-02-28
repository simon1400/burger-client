import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { candal } from "styles/typography/baseHead";

export const InputS = styled(TextField)(({theme, error, disabled}) => `
  input{
    background-color: ${disabled ? "rgba(255, 255, 255, 0.2)" : error ? "#e87c74" : "rgba(255, 255, 255, 0.95)"};
    box-shadow: inset 0 3px 5px 0 rgba(0, 0, 0, 0.2);
    border: solid 1.5px rgba(20, 20, 20, 0.2);
    height: auto;
    padding: 14px 19px;
    font-size: 18px;
    line-height: 27px;
    color: #141414;
    border-radius: 5px;
  }
  height: 48px;
  width: 100%;
`)

export const InputWrap = styled.div<{error: boolean; disabled: boolean}>(({theme, error, disabled}) => `
  margin-bottom: 20px;
  .label-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    label{
      color: ${disabled ? "rgba(255, 255, 255, 0.4)" : error ? theme.palette.primary.main : "white"};
      margin-bottom: 15px;
      font-family: ${candal.style.fontFamily};
    }
    span{
      color: ${theme.palette.primary.main};
    }
  }
  .helper-text{
    text-align: right;
    display: block;
    font-size: 18px;
    color: ${disabled ? "rgba(255, 255, 255, 0.4)" : "#f5eceb"};
    margin-top: 20px;
  }

`)