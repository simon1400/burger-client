import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { candal } from "styles/typography/baseHead";

export const ButtonS = styled(Button)(({theme}) => `
  border-radius: 24px;
  height: 48px;
  min-width: 230px;
  border: solid 3px rgba(217, 41, 28, 0.3);
  font-size: 20px;
  text-transform: none;
  font-family: ${candal.style.fontFamily};
`)