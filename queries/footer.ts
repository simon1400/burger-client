import { gql } from "@apollo/client";

const footerQuery = gql`
  query Footer($locale: I18NLocaleCode!) {
    global(locale: $locale) {
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