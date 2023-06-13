import { gql } from "@apollo/client";

export const aplicationsQuery = gql`
  query Aplications {
    applications {
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