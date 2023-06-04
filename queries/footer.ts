import { gql } from "@apollo/client";

const footerQuery = gql`
  query Footer {
    global {
      data {
        attributes {
          logoPartners{
            data {
              attributes{
                url
              }
            }
          }
          soc {
            type
            link
          }
          phone
          email
        }
      }
    }
  }
`

export default footerQuery