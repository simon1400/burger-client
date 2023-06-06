import styled from "@emotion/styled";

export const CenterWrap = styled.div<{marginBottom?: number;}>(({marginBottom = 0, theme}) => `
  text-align: center;
  margin-bottom: ${marginBottom}px;
  h2{
    margin-bottom: 60px;
  }
`)