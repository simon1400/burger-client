import styled from "@emotion/styled";

export const Labels = styled.div<{modal?: boolean}>(({theme, modal = false}) => `
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  > * {
    margin-right: 10px;
    margin-left: 10px;
  }
  svg{
    margin-right: 8px;
  }
  ${theme.breakpoints.down("md")} {
    flex-wrap: ${modal ? "wrap" : "nowrap"};
  }
`)