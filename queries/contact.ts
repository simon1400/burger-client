import { gql } from "@apollo/client";

const contactQuery = gql`
  query Contact {
    contact {
      data {
        attributes {
          title
          content
          title2
          content2
          phone
          email
          item{
            title
            function
            email
            image{
              data{
                attributes{
                  url
                }
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

export default contactQuery