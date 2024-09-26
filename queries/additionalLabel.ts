import { gql } from "@apollo/client";

export const additionalLabelQuery = gql`
  query AdditionalLabel {
    global {
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