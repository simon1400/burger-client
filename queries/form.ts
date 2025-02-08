import { gql } from "@apollo/client";

const formQuery = gql`
  query Form($locale: I18NLocaleCode!) {
    form(locale: $locale) {
      data {
        attributes {
          fields{
            ... on ComponentFormTetxField {
              label
              helperText
              errorMessage
              placeholder
              required
            }
            ... on ComponentFormSelect {
              label
              required
              errorMessage
              item {
                label
                disabled
              }
            }
            ... on ComponentFormRadio {
              label
              required
              errorMessage
              item {
                label
                disabled
              }
            }
            ... on ComponentFormUploud {
              label
            }
          }
        }
      }
    }
  }
`

export const formPage = gql`
  query FormPage($locale: I18NLocaleCode!) {
    applicationPage(locale: $locale) {
      data{
        attributes {
          title
          content
          content2
          meta{
            title
            description
          }
        }
      }
    }
  }
`

export default formQuery