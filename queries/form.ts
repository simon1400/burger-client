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
              key
              errorMessage
              placeholder
              required
            }
            ... on ComponentFormSelect {
              key
              item {
                label
                disabled
              }
            }
            ... on ComponentFormRadio {
              key
              item {
                label
                disabled
              }
            }
            ... on ComponentFormUploud {
              key
            }
          }
        }
      }
    }
  }
`

export default formQuery