import styled from "@emotion/styled";

export const ImgCircle = styled.div<{big?: boolean}>(({theme, big = false}) => `
  position: relative;
  width: ${big ? "330px" : "214px"};
  height: ${big ? "330px" : "214px"};
  border: 3px solid ${theme.palette.primary.main};
  overflow: hidden;
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 20px;
  /* margin-left: auto;
  margin-right: auto; */
  img{
    object-fit: cover;
    object-position: center;
  }
`)