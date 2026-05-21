import styled from "@emotion/styled";

export const BlockContentS = styled.section<{margin: boolean}>(({theme, margin}) => `
  text-align: center;
  margin-bottom: ${margin ? "30px" : "0"};
`)

export const HeadWrap = styled.div(({theme}) => `
  margin-top: 30px;
  h2{
    margin-bottom: 0;
  }
  time {
    font-size: 27px;
    margin-top: 22px;
    display: block;
  }
  ${theme.breakpoints.down('md')} {
    margin-top: 18px;
    time {
      font-size: 20px;
      margin-top: 15px;
    }
  }
`)