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


export const getAllVotes = gql`
  query Votes {
    votes {
      data {
        attributes{
          name
          email
          phone
          codes{
            code
          }
          festivaly {
            data{
              attributes{
                title
                slug
              }
            }
          }
          shop
        }
      }
    }
  }
`

