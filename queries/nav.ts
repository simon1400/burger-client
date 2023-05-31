import { gql } from "@apollo/client";

const navTopQuery = gql`
  query Nav {
    nav {
      data {
        attributes {
          topNav {
            title
            link
            child{
              title
              link
            }
          }
        }
      }
    }
  }
`

export default navTopQuery