import { gql } from "@apollo/client";

export const getCodeQuery = gql`
  query Codes($code: String!, $locale: I18NLocaleCode!) {
    codes(locale: $locale, filters: {code: {eq: $code}}) {
      data {
        id
      }
    }
  }
`

export const getAllVotes = gql`
  query Votes ($festivalSlug: String!, $locale: I18NLocaleCode!) {
    votes(locale: $locale, filters: {festivaly: {slug: {eq: $festivalSlug}}}) {
      data {
        attributes{
          name
          email
          phone
          marketing
          mailConfirm
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

