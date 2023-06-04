import { gql } from "@apollo/client";

const mapQuery = gql`
  query Map {
    map {
      data {
        attributes {
          map
          point {
            idLayer
            festival{
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