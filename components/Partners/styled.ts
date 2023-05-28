import styled from "@emotion/styled";

export const PartnersS = styled.section(({theme}) => `
  padding-top: 120px;
  padding-bottom: 35px;
  text-align: center;
  h3{
    margin-bottom: 80px;
  }
`)

export const LogoWrap = styled.div(({theme}) => `
  position: relative;
  height: 170px;
  img{
    object-fit: contain;
    object-position: center;
  }
`)