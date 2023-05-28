import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { Container } from "@mui/material"
import { ImgCircle } from "styles/ImgCircle"
import Image from "next/image"
import { CenterWrap } from "styles/CenterWrap"
import ArticleShort from "components/ArticleShort"

const Blog: NextPage = () => {
  return (
    <Page>
      <Head />
      <Container>
        <CenterWrap>
          <ImgCircle>
            <Image src="/img/winner.webp" fill alt="" />
          </ImgCircle>
        </CenterWrap>
      </Container>
      <Container>
        <ArticleShort />
        <ArticleShort />
      </Container>
    </Page>
  )
}

export default Blog