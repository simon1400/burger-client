interface IBlockContent {
  time?: {
    from: string
    to: string
  }
  bg?: 'red' | 'yellow1' | 'yellow2' | 'purple'
  content?: string
  head?: string
  margin?: boolean
}

interface IButton {
  children: string
  children: string
}

interface IContactLine {
  icon: ReactNode
  link: string
  title: string
  icon: ReactNode
  link: string
  title: string
}

interface IContactItem {
  data: any
}

interface IHead {
  data: string
  data: string
}

interface ILineup {
  head: string
  data: any
  hp?: boolean
  registration?: boolean
  handleChange?: (arr: []) => void
  head: string
  data: any
  hp?: boolean
  registration?: boolean
  handleChange?: (arr: []) => void
}

interface IHomepage {
  title: string
  title2: string
  content: string
  eventHead: string
  galery: IImages
  meta: IMeta
  title: string
  title2: string
  content: string
  eventHead: string
  galery: IImages
  meta: IMeta
}

interface ITopNav {
  title: string
  link: string
  title: string
  link: string
}

interface IGalery {
  modal?: boolean
  images: IImages
  removePadding?: boolean
  removePadding?: boolean
}

interface IImageAttributes {
  attributes: {
    url: string
    url: string
  }
}

interface IImage {
  data: IImageAttributes
}

interface IImages {
  data: IImageAttributes[]
}

interface IMeta {
  title: string
  description: string
  title: string
  description: string
}

interface IFacebookEvent {
  single?: boolean
  data: string
  data: string
}

interface ILink {
  text: string
  link: string
  text: string
  link: string
}

interface IHomepage {
  title: string
  image: IImage
  content: string
  meta: IMeta
  title: string
  image: IImage
  content: string
  meta: IMeta
  Components?: any
}

interface IFestivals {
  title: string
  slug: string
  from: string
  to: string
  social: string
  title: string
  slug: string
  from: string
  to: string
  social: string
}

interface ILabels {
  data: {
    attributes: {
      title: string
      image: IImage
      title: string
      image: IImage
    }
  }
}

interface ILineup {
  data: {
    attributes: {
      title: string
      slug: string
      image: IImage
      labels: ILabels
      title: string
      slug: string
      image: IImage
      labels: ILabels
    }[]
  }
  modal?: boolean
}

interface IVouchers {
  name: string
  number: string
  name: string
  number: string
}

interface IWinner {
  data: {
    attributes: {
      title: string
      image: IImage
      slug: string
      title: string
      image: IImage
      slug: string
    }
  }
}

interface IFestival {
  title: string
  content: string
  contentBefore: string
  contentAfter: string
  place: string
  galery: IImages
  from: string
  to: string
  lineup: ILineup
  social: string
  vouchers: IVouchers[]
  winner1: IWinner
  winner2: IWinner
  winner3: IWinner
}
