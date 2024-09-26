import styled from "@emotion/styled";

export const ContactLines = styled.div(({theme}) => `
  display: inline-flex;
  margin-bottom: 120px;
  margin-top: 50px;
  ${theme.breakpoints.down("md")} {
    flex-direction: column;
    display: flex;
  }
`)