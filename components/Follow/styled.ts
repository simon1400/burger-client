import styled from "@emotion/styled";

export const FollowS = styled.section`
  text-align: center;
  padding-top: 35px;
  h3{
    margin-bottom: 60px;
  }
  ul{
    li{
      display: inline-block;
      &:not(:first-of-type) {
        margin-left: 3.5px;
      }
      &:not(:last-of-type) {
        margin-right: 3.5px;
      }
      a{
        background: #1773ea;
        width: 60px;
        height: 60px;
        display: flex;
        border-radius: 50%;
        transform: scale(1);
        transition: all .2s ease;
        &:hover{
          transform: scale(1.1);
        }
      }
    }
  }
  svg{
    fill: white;
    height: 30px;
    margin: auto;
  }
`