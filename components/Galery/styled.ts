import styled from "@emotion/styled";

export const GaleryS = styled.div<{modal: boolean; removePadding: boolean}>(({modal, theme, removePadding}) => `
  padding-top: ${removePadding ? "0" : "60px"};
  padding-bottom: ${modal ? "0" : "60px"};
  ${theme.breakpoints.down("md")} {
    padding-top: ${modal ? "0" : "60px"};
  }
`)

export const GaleryItem = styled.div(({theme}) => `
  position: relative;
  overflow: hidden;
  height: 285px;
  img{
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: all .5s ease;
    transform-origin: center;
  }
  &:hover{
    img{
      transform: scale(1.05);
    }
  }
  ${theme.breakpoints.down("md")} {
    height: 130px;
  }
`)