import { gql } from "@apollo/client";

export const festivalsQuery = gql`
  query Festivals($locale: I18NLocaleCode!) {
    festivals(locale: $locale) {
      data {
        attributes{
          title
          slug
          state
          showAddLabel
          from
          to
          social
          content
          place
        }
      }
    }
  }
`

export const festivalsPageQuery = gql`
  query Festivals($locale: I18NLocaleCode!) {
    festivalsPage(locale: $locale) {
      data {
        attributes {
          title
          content
          title2
          content2
          galery {
            data {
              attributes {
                url
              }
            }
          }
          meta {
            title
            description
          }
        }
      }
    }
  }
`

export const festivalsGaleryQuery = gql`
  query FestivalsGalery($locale: I18NLocaleCode!) {
    festivals(locale: $locale) {
      data {
        attributes{
          title
          from
          to
          place
          galery{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }
`

export const festivalsWinnersQuery = gql`
  query FestivalsWinners($locale: I18NLocaleCode!) {
    festivals(locale: $locale) {
      data {
        attributes{
          title
          from
          to
          place
          slug
          vouchers{
            name
            number
          }
          winner1 {
            data{
              attributes{
                title
                slug
                image{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
          winner2 {
            data{
              attributes{
                title
                slug
                image{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
          winner3 {
            data{
              attributes{
                title
                slug
                image{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const getFestival = gql`
  query Festival($slug: String!, $locale: I18NLocaleCode!) {
    festivals(locale: $locale, filters: {slug: {eq: $slug}}) {
      data {
        id
        attributes{
          title
          content
          contentBefore
          contentAfter
          place
          galery {
            data {
              attributes {
                url
              }
            }
          }
          from
          to
          lineup{
            data{
              attributes{
                title
                slug
                full
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
                labels{
                  data{
                    attributes{
                      title
                      icon{
                        data{
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          social
          vouchers{
            name
            number
          }
          winner1 {
            data{
              attributes{
                title
                slug
                image{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
          winner2 {
            data{
              attributes{
                title
                slug
                image{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
          winner3 {
            data{
              attributes{
                title
                slug
                image{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

