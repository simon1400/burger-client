import { gql } from "@apollo/client";

const partnersQuery = gql`
  query Partners {
    partner {
      data {
        attributes {
          title
          title2
          content
          content2
          headTopPartner
          headPartner
          headSupport
          button{
            text
            link
          }
          topPartners {
            data{
              attributes {
                url
              }
            }
          }
          partners {
            data{
              attributes {
                url
              }
            }
          }
          supported {
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

export default partnersQuery