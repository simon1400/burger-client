import styled from "@emotion/styled";

export const ImgSquare = styled.div<{margin?: boolean; big?: boolean; partners?: boolean}>(({theme, big = false, partners = false, margin = false}) => `
  ${!partners ? "padding-top: 70%;" : ""}
  ${partners ? `width: ${big ? "330px;" : "214px;"}` : ""}
  ${partners ? `height: ${big ? "330px;" : "214px;"}` : ""}
  position: relative;
  margin-right: ${margin ? "60px" : partners ? "auto" : "0"};
  margin-left: ${partners ? "auto" : "0"};
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  ${theme.breakpoints.down('md')} {
    margin-right: ${partners ? "auto" : "0"};
    margin-bottom: 20px;
  }
`)