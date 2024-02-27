import { gql } from "@apollo/client";

export const getCodeQuery = gql`
  query Codes($code: String!) {
    codes(filters: {code: {eq: $code}}) {
      data {
        id
      }
    }
  }
`

