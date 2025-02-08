import { gql } from "@apollo/client";

const homepageQuery = gql`
  query Homepage ($locale: I18NLocaleCode!) {
    homepage(locale: $locale) {
      data {
        attributes {
          title
          title2
          content
          eventHead
          galery {
            data{
              attributes {
                url
              }
            }
          }
          meta{
            title
            description
          }
        }
      }
    }
  }
`

export default homepageQuery