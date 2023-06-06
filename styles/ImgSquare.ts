import styled from "@emotion/styled";

export const ImgSquare = styled.div<{margin?: boolean; big?: boolean; partners?: boolean}>(({theme, big = false, partners = false, margin = false}) => `
  ${!partners ? "padding-top: 70%;" : ""}
  ${partners ? `width: ${big ? "330px;" : "214px;"}` : ""}
  ${partners ? `height: ${big ? "330px;" : "214px;"}` : ""}
  position: relative;
  margin-right: ${margin ? "60px" : partners ? "auto" : "0"};
  margin-left: ${partners ? "auto" : "0"};
  ${partners ? `
    border: 3px solid ${theme.palette.primary.main};
    border-radius: 10px;
    overflow: hidden;
  ` : ""}
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`)