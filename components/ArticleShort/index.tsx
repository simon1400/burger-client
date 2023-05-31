import { Grid, Typography } from "@mui/material"
import { ArticleContent, ArticleShortS } from "./styled"
import Image from "next/image"
import { ImgSquare } from "styles/ImgSquare"
import LabelBare from "components/LabelBare"
import IconButton from "components/IconButton"
import ArrowRight from 'public/img/arrow-right.svg'
import { FC } from "react"

const APP_API = process.env.APP_API

const ArticleShort: FC<{data: any}> = ({data}) => {
  return (
    <ArticleShortS>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <ImgSquare margin>
            <Image src={APP_API+data.image.data.attributes.url} fill alt="" />
          </ImgSquare>
        </Grid>
        <Grid item xs={6}>
          <ArticleContent>
            {data.label?.data && <LabelBare data={data.label.data.attributes.title}/>}
            <Typography variant="h2">{data.title}</Typography>
            <Typography className="short-content" component="div" dangerouslySetInnerHTML={{__html: data.content}}/>
            <IconButton href={`/blog/${data.slug}`}>
              <ArrowRight />
            </IconButton>
          </ArticleContent>
        </Grid>
      </Grid>
    </ArticleShortS>
  )
}

export default ArticleShort