import { gql } from "@apollo/client";

const navTopQuery = gql`
  query Nav {
    navigation {
      data {
        attributes {
          topNav {
            title
            link
          }
        }
      }
    }
  }
`

export default navTopQuery