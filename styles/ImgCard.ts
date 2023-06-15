import styled from "@emotion/styled";

export const ImgCard = styled.div<{big?: boolean}>(({theme, big = false}) => `
  position: relative;
  width: calc(100% - 6px);
  height: auto;
  padding-top: 100%;
  border: 3px solid ${theme.palette.primary.main};
  overflow: hidden;
  border-radius: 30px;
  margin-bottom: 10px;
  img{
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
`)