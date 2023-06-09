import styled from "@emotion/styled";

export const HeadS = styled.div(({theme}) => `
  text-align: center;
  margin-bottom: 30px;
  h1{
    margin-bottom: 30px;
  }
  svg{
    width: 236px;
    height: 20px;
  }
  ${theme.breakpoints.down("md")} {
    svg{
      width: 150px;
      height: 13px;
    }
  }
`)