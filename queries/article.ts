import { gql } from "@apollo/client";

export const getArticle = gql`
  query Article($slug: String!) {
    articles(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          content
          button {
            text
            link
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