import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container, Typography } from "@mui/material"
import { CenterWrap } from "styles/CenterWrap"
import { wrapper } from "stores"
import { client } from "lib/api"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import Button from "components/Button"
import { getArticle } from "queries/article"
import Galery from "components/Galery"

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: getArticle,
      variables: {
        slug: ctx.params?.slug
      }
    });

    if(!data.articles.data.length) {
      return {
        notFound: true
      }
    }

    const article = data.articles.data[0].attributes;

    store.dispatch(changeTitle(article.meta?.title || article.title))
    store.dispatch(changeDescription(article.meta?.description || ''))

    return {
      props: {
        article
      }
    };
  }
);

const Article: NextPage<{article: any}> = ({article}) => {
  return (
    <Page>
      <Head data={article.title} />
      <Container maxWidth="md">
        <CenterWrap>
          <Typography component="div" dangerouslySetInnerHTML={{__html: article.content.replace(/\/uploads/g, "https://burger-strapi.hardart.cz/uploads")}} />
        </CenterWrap>
        {article.button && <CenterWrap marginTop={50}>
          <Button href={article.button?.link || "/"}>{article.button?.text || "Empty text"}</Button>
        </CenterWrap>}
      </Container>
      {!!article.galery.data.length && <Galery images={article.galery}/>}
    </Page>
  )
}

export default Article