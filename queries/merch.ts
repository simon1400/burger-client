import { gql } from "@apollo/client";

export const merchPageQuery = gql`
  query MerchPage($locale: I18NLocaleCode!) {
    mercPage(locale: $locale) {
      data {
        attributes {
          title
          content
          title2
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


export const merchesQuery = gql`
  query Merches($locale: I18NLocaleCode!) {
    merches(locale: $locale) {
      data {
        attributes {
          title
          slug
          price
          image {
            data{
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`

export const getMerch = gql`
  query Merch($slug: String!, $locale: I18NLocaleCode!) {
    merches(locale: $locale, filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          content
          title2
          content2
          price
          image {
            data{
              attributes {
                url
              }
            }
          }
          meta{
            title
            description
          }
        }
      }
    }
  }
`