import styled from "@emotion/styled";

export const LabelS = styled.div<{modal: boolean}>(({theme, modal}) => `
  display: flex;
  img{
    margin-right: 10px;
  }
  ${theme.breakpoints.down("md")} {
    margin-bottom: ${modal ? "10px" : "0px"};
    img{
      margin-right: ${modal ? "10px" : "0px"};
    }
    span{
      display: ${modal ? "inline-block" : "none"};
    }
  }
`)