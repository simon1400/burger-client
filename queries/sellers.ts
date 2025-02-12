import { gql } from "@apollo/client";

export const getSeller = gql`
  query Seller($slug: String!, $locale: I18NLocaleCode!) {
    sellers(locale: $locale, filters: {slug: {eq: $slug}}) {
      data {
        attributes{
          title
          image{
            data{
              attributes{
                url
              }
            }
          }
          category{
            data{
              attributes{
                title
                icon{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
          content
          galery{
            data{
              attributes{
                url
              }
            }
          }
          labels{
            data{
              attributes{
                title
                icon{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
          socials{
            text
            link
          }
          festival1{
            data{
              id
            }
          }
          festival2{
            data{
              id
            }
          }
          festival3{
            data{
              id
            }
          }
        }
      }
    }
  }
`

