import { gql } from "@apollo/client";

export const getMetaGalery = gql`
  query MetaGalery($locale: I18NLocaleCode!) {
    global(locale: $locale) {
      data {
        attributes {
          metaGalery{
            title
            description
          }
        }
      }
    }
  }
`

export const getMetaWinners = gql`
  query MetaWinners($locale: I18NLocaleCode!) {
    global(locale: $locale) {
      data {
        attributes {
          metaWinners{
            title
            description
          }
        }
      }
    }
  }
`