import styled from "@emotion/styled";

export const Labels = styled.div(({theme}) => `
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
`)