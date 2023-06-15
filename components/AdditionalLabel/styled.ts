import styled from "@emotion/styled";
import Link from "next/link";

export const AdditionalLabelS = styled(Link)(({theme}) => `
  display: flex;
  align-items: center;
  margin-right: 25px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all .2s ease;
  img{
    margin-right: 10px;
  }
  &:hover{
    color: white;
  }
`)