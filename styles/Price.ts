import styled from "@emotion/styled";

export const Price = styled.div<{big?: boolean}>(({theme, big = false}) => `
  color: ${theme.palette.primary.main};
  font-size: ${big ? "46px" : "23px"};
  margin-bottom: ${big ? "30px" : "0px"};
  text-align: center;
`)