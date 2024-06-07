import { gql } from "@apollo/client";

export const newsPageQuery = gql`
  query NewsPage {
    newsPage {
      data {
        attributes {
          title
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
  query News {
    newss {
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
  query News($slug: String!) {
    newss(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          content
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