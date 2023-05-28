import { gql } from "@apollo/client";

const footerQuery = gql`
  query Footer {
    footer {
      data {
        attributes {
          footer1 {
            title
            content
          }
          footer2 {
            title
            content
          }
          footer3 {
            title
            content
          }
        }
      }
    }
  }
`

export default footerQuery