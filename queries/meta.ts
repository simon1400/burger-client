import { gql } from "@apollo/client";

export const getMetaGalery = gql`
  query MetaGalery {
    global {
      data {
        attributes {
          metaGalery{
            title
            description
          }
        }
      }
    }
  }
`

export const getMetaWinners = gql`
  query MetaWinners {
    global {
      data {
        attributes {
          metaWinners{
            title
            description
          }
        }
      }
    }
  }
`