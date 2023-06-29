import styled from "@emotion/styled";
import { candal } from "styles/typography/baseHead";

export const LabelMoreS = styled.div(({theme}) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 46px;
  font-family: ${candal.style.fontFamily};
  color: white;
  text-align: center;
  width: 110px;
  height: 110px;
  background-color: rgba(217, 41, 28, 0.8);
  border-radius: 50%;
  line-height: 100px;
`)