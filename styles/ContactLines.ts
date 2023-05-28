import styled from "@emotion/styled";

export const ContactLines = styled.div`
  display: inline-flex;
  margin-bottom: 120px;
  margin-top: 50px;
  > div{
    &:not(:first-of-type) {
      margin-left: 18px;
    }
    &:not(:last-of-type) {
      margin-right: 18px;
    }
  }
`