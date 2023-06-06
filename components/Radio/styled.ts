import styled from "@emotion/styled";
import { RadioGroup } from "@mui/material";

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
`)