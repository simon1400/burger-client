import { gql } from '@apollo/client'

const mapQuery = gql`
  query Map($locale: I18NLocaleCode!) {
    map(locale: $locale) {
      data {
        attributes {
          map
          point {
            idLayer
            festival {
              data {
                attributes {
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`

export default mapQuery
