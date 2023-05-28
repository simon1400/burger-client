import styled from "@emotion/styled";

export const BlockContentS = styled.section<{margin: boolean}>(({theme, margin}) => `
  text-align: center;
  margin-bottom: ${margin ? "30px" : "0"};
`)

export const HeadWrap = styled.div`
  h2{
    margin-bottom: 0;
  }
  time {
    font-size: 27px;
    margin-top: 15px;
    display: block;
  }
`