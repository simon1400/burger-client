import styled from "@emotion/styled";
import Link from "next/link";
import { candal } from "styles/typography/baseHead";

export const ContactLineS = styled(Link)(({theme}) => `
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-family: ${candal.style.fontFamily};
  svg{
    margin-right: 10px;
    height: 30px;
    fill: red;
  }
  &:not(:first-of-type) {
    margin-left: 18px;
  }
  &:not(:last-of-type) {
    margin-right: 18px;
  }
  ${theme.breakpoints.down("md")} {
    justify-content: center;
    &:not(:first-of-type) {
      margin-top: 10px;
      margin-left: 0;
    }
    &:not(:last-of-type) {
      margin-bottom: 10px;
      margin-right: 0;
    }
  }
`)