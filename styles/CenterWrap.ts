import styled from "@emotion/styled";

export const CenterWrap = styled.div<{marginBottom?: number; marginTop?: number;}>(({marginBottom = 0, marginTop = 0, theme}) => `
  text-align: center;
  margin-bottom: ${marginBottom}px;
  margin-top: ${marginTop}px;
  h2{
    margin-bottom: 60px;
  }
`)