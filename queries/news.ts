import { gql } from "@apollo/client";

export const newsPageQuery = gql`
  query NewsPage($locale: I18NLocaleCode!) {
    newsPage(locale: $locale) {
      data {
        attributes {
          title
          content
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


export const newsQuery = gql`
  query News($locale: I18NLocaleCode!) {
    newss(locale: $locale) {
      data {
        attributes {
          title
          slug
          content
          datePublication
          label {
            data{
              attributes{
                title
              }
            }
          }
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

export const getNews = gql`
  query News($slug: String!, $locale: I18NLocaleCode!) {
    newss(locale: $locale, filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          content
          youtube
          label {
            data{
              attributes{
                title
              }
            }
          }
          image {
            data{
              attributes {
                url
              }
            }
          }
          galery {
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