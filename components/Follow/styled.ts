import styled from '@emotion/styled'

export const FollowS = styled.section`
  text-align: center;
  padding-top: 35px;
  .footer-head {
    margin-bottom: 80px;
    h2 {
      margin-bottom: 0;
    }
  }
  ul {
    li {
      display: inline-block;
      &:not(:first-of-type) {
        margin-left: 3.5px;
      }
      &:not(:last-of-type) {
        margin-right: 3.5px;
      }
      a {
        width: 60px;
        height: 60px;
        display: flex;
        border-radius: 50%;
        transform: scale(1);
        transition: all 0.2s ease;
        &:hover {
          transform: scale(1.1);
        }
        svg {
          fill: white;
          margin: auto;
        }
      }
      &.soc-instagram {
        a {
          background-image: linear-gradient(
            133deg,
            #f58529 15%,
            #dd2a7b 39%,
            #8134af 65%,
            #515bd4 86%
          );
        }
      }
      &.soc-facebook {
        a {
          background-color: #1773ea;
          svg {
            height: 29px;
          }
        }
      }
    }
  }
`
