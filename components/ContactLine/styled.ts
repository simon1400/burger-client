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
  }
  &:not(:first-of-type) {
    margin-left: 18px;
  }
  &:not(:last-of-type) {
    margin-right: 18px;
  }
`)