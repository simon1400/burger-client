import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container } from "@mui/material"
import Image from "next/image"
import { CenterWrap } from "styles/CenterWrap"
import ArticleShort from "components/ArticleShort"
import { wrapper } from "stores"
import { client } from "lib/api"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import { ImgSquare } from "styles/ImgSquare"
import { sortDate } from "helpers/sortDate"
import { newsPageQuery, newsQuery } from "queries/news"

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: newsPageQuery,
    });
    
    const { data: newsData } = await client.query({
      query: newsQuery,
    });

    const newsPage = data.newsPage.data.attributes;
    const news = newsData.newss.data.map((item: any) => item.attributes);

    store.dispatch(changeTitle(newsPage.meta?.title || 'Blog'))
    store.dispatch(changeDescription(newsPage.meta?.description || ''))

    return {
      props: {
        newsPage,
        news
      }
    };
  }
);

const News: NextPage<{newsPage: any; news: any}> = ({newsPage, news}) => {

  return (
    <Page>
      <Head data={newsPage.title} />
      <Container sx={{mb: 20}}>
        <CenterWrap>
          <ImgSquare partners>
            <Image src={APP_API+newsPage.image.data.attributes.url+"?format=svg&resize=220x220"} fill alt="" />
          </ImgSquare>
        </CenterWrap>
      </Container>
      <Container>
        {sortDate(news).map((item: any, idx: number) => <ArticleShort type="news" key={idx} data={item} />)}
      </Container>
    </Page>
  )
}

export default News