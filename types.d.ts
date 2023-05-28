interface IBlockContent {
  time?: boolean;
  content?: boolean;
  margin?: boolean;
}

interface IButton {
  children: string;
}

interface IContactLine {
  icon: ReactNode;
  link: string;
}

interface IContactItem {
  
}

interface ITopNav {
  title: string;
  link: string;
}

interface IGalery {
  modal?: boolean
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
}

interface ILink {
  text: string;
  link: string;
}

interface IComponentArticles {
  title: string;
  image: IImage;
  content: string;
  link: ILink;
}

interface IComponentClients {
  title: string;
  images: IImages;
}

interface IPageTop {
  title: string;
  imageUrl: string;
}

interface IHomepage {
  title: string;
  image: IImage;
  content: string;
  meta: IMeta;
  Components?: any
}

interface IIconItem {
  title: string;
  content: string;
  icon: IImage;
}

interface IArticleShort {
  title: string;
  content: string;
  link: ILink;
  image: IImage;
}

interface IComponentSmallItem {
  title: string;
  content: string;
}

interface IArticlePage {
  title: string;
  content: string;
  meta: IMeta;
  image: IImage;
  components: any;
}