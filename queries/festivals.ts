import { gql } from "@apollo/client";

export const festivalsQuery = gql`
  query Festivals {
    festivals {
      data {
        attributes{
          title
          slug
          from
          to
          social
        }
      }
    }
  }
`

export const festivalsGaleryQuery = gql`
  query FestivalsGalery {
    festivals {
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
  query FestivalsWinners {
    festivals {
      data {
        attributes{
          title
          from
          to
          place
          vouchers{
            name
            number
          }
          winner1 {
            data{
              attributes{
                title
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
  query Festival($slug: String!) {
    festivals(filters: {slug: {eq: $slug}}) {
      data {
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
                category{
                  data{
                    attributes{
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

