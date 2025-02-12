import { gql } from "@apollo/client";

export const aplicationsQuery = gql`
  query Aplications($locale: I18NLocaleCode!) {
    applications(locale: $locale) {
      data {
        attributes {
          result{
            key
            value
          }
        }
      }
    }
  }
`