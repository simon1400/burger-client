import styled from "@emotion/styled";

export const SelectS = styled.div(({theme}) => `
  margin-bottom: 20px;
  > * {
    display: block;
    border-bottom: 4px dotted #5a5a5a;
    padding: 16px 0;
    &:last-of-type{
      border-bottom: none;
    }
  }
`)