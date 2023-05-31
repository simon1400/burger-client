interface IBlockContent {
  time?: boolean;
  content?: string;
  head?: string;
  margin?: boolean;
}

interface IButton {
  children: string;
}

interface IContactLine {
  icon: ReactNode;
  link: string;
  title: string;
}

interface IContactItem {
  data: any
}

interface IHead {
  data: string;
}

interface ILineup {
  head: string;
  data: any;
}

interface IHomepage {
  title: string;
  title2: string;
  content: string;
  eventHead: string;
  galery: IImages;
  meta: IMeta;
}

interface ITopNav {
  title: string;
  link: string;
}

interface IGalery {
  modal?: boolean
  images: IImages
}

interface IImageAttributes {
  attributes: {
    url: string;
  }
}

interface IImage {
  data: IImageAttributes
}

interface IImages {
  data: IImageAttributes[]
}

interface IMeta {
  title: string;
  description: string;
}

interface IFacebookEvent {
  single?: boolean
  data: string;
}

interface ILink {
  text: string;
  link: string;
}

interface IHomepage {
  title: string;
  image: IImage;
  content: string;
  meta: IMeta;
  Components?: any
}

interface IFestivals {
  title: string;
  slug: string;
  from: string;
  to: string;
  social: string;
}

interface ILabels {
  data: {
    attributes: {
      title: string;
      image: IImage;
    }
  }
}

interface ILineup {
  data: {
    attributes: {
      title: string;
      slug: string;
      image: IImage;
      labels: ILabels;
    }[]
  }
  modal?: boolean
}

interface IVouchers {
  name: string;
  number: string;
}

interface IWinner {
  data: {
    attributes: {
      title: string;
      image: IImage;
    }
  }
}

interface IFestival {
  title: string;
  content: string;
  contentBefore: string;
  contentAfter: string;
  place: string;
  galery: IImages;
  from: string;
  to: string;
  lineup: ILineup;
  social: string;
  vouchers: IVouchers[];
  winner1: IWinner;
  winner2: IWinner;
  winner3: IWinner;
}