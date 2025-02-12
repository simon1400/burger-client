import { gql } from "@apollo/client";

const partnersQuery = gql`
  query Partners($locale: I18NLocaleCode!) {
    partner(locale: $locale) {
      data {
        attributes {
          title
          title2
          content
          content2
          headTopPartner
          headPartner
          headPartner2
          headSupport
          button{
            text
            link
          }
          topPartners {
            image{
              data{
                attributes {
                  url
                }
              }
            }
            link
          }
          partners {
            image{
              data{
                attributes {
                  url
                }
              }
            }
            link
          }
          partners2 {
            image{
              data{
                attributes {
                  url
                }
              }
            }
            link
          }
          supported {
            image{
              data{
                attributes {
                  url
                }
              }
            }
            link
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