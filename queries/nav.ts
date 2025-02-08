import { gql } from "@apollo/client";

const navTopQuery = gql`
  query Nav($locale: I18NLocaleCode!) {
    nav(locale: $locale) {
      data {
        attributes {
          topNav {
            title
            link
            child{
              title
              link
            }
          }
        }
      }
    }
  }
`

export default navTopQuery