import { gql } from "@apollo/client";

const homepageQuery = gql`
  query Homepage {
    homepage {
      data {
        attributes {
          title
          title2
          content
          eventHead
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

export default homepageQuery