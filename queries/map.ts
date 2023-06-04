import { gql } from "@apollo/client";

const mapQuery = gql`
  query Map {
    map {
      data {
        attributes {
          map
          point {
            idLayer
            festivals{
              data{
                attributes{
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`

export default mapQuery