import styled from "@emotion/styled";

export const GaleryS = styled.div<{modal: boolean}>(({modal}) => `
  padding-top: 60px;
  padding-bottom: ${modal ? "0" : "60px"};
`)

export const GaleryItem = styled.div`
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
`