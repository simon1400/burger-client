import { gql } from "@apollo/client";

export const blogPageQuery = gql`
  query BlogPage {
    blog {
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


export const postsQuery = gql`
  query Posts {
    posts {
      data {
        attributes {
          title
          slug
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
        }
      }
    }
  }
`

export const getPost = gql`
  query Post($slug: String!) {
    posts(filters: {slug: {eq: $slug}}) {
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
          meta{
            title
            description
          }
        }
      }
    }
  }
`