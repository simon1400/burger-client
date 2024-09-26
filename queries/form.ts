import { gql } from "@apollo/client";

const formQuery = gql`
  query Form {
    form {
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
  query FormPage {
    applicationPage {
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