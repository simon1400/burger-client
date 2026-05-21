import { gql } from "@apollo/client";

const partnerFragment = `
  data {
    id
    attributes {
      name
      link
      logo {
        data {
          attributes {
            url
          }
        }
      }
    }
  }
`

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
          topPartners(sort: "name:asc", pagination: { limit: 100 }) {
            ${partnerFragment}
          }
          partners(sort: "name:asc", pagination: { limit: 100 }) {
            ${partnerFragment}
          }
          partners2(sort: "name:asc", pagination: { limit: 100 }) {
            ${partnerFragment}
          }
          supported(sort: "name:asc", pagination: { limit: 100 }) {
            ${partnerFragment}
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
