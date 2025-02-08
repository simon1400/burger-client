import { gql } from "@apollo/client";

export const additionalLabelQuery = gql`
  query AdditionalLabel($locale: I18NLocaleCode!) {
    global(locale: $locale) {
      data {
        attributes {
          additionalLabel{
            icon{
              data{
                attributes{
                  url
                }
              }
            }
            text
            link
          }
        }
      }
    }
  }
`