import styled from "@emotion/styled";

export const ImgSquare = styled.div<{margin?: boolean}>(({margin = false}) => `
  padding-top: 70%;
  position: relative;
  margin-right: ${margin ? "60px" : "0"};
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`)