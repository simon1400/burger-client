import { gql } from '@apollo/client'

const footerQuery = gql`
  query Footer($locale: I18NLocaleCode!) {
    global(locale: $locale) {
      data {
        attributes {
          phone
          email
          logoPartners {
            data {
              attributes {
                url
              }
            }
          }
          soc {
            type
            link
          }
        }
      }
    }
  }
`

export default footerQuery
