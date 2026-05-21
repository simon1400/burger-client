import { gql } from '@apollo/client'

const footerQuery = gql`
  query Footer($locale: I18NLocaleCode!) {
    global(locale: $locale) {
      data {
        attributes {
          phone
          email
          partnersFooter(sort: "name:asc", pagination: { limit: 100 }) {
            data {
              id
              attributes {
                name
                link
                logo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
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
