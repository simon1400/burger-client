import { Grid, Typography } from "@mui/material"
import { ArticleContent, ArticleShortS } from "./styled"
import Image from "next/image"
import { ImgSquare } from "styles/ImgSquare"
import LabelBare from "components/LabelBare"
import IconButton from "components/IconButton"
import ArrowRight from 'public/img/arrow-right.svg'
import { FC } from "react"
import Link from "next/link"
import { kitcut } from "helpers/kitkut"
import { parseDate } from "helpers/parseDate"

const APP_API = process.env.APP_API

const ArticleShort: FC<{data: any}> = ({data}) => {

  const date = data.datePublication ? parseDate(data.datePublication) : null

  return (
    <ArticleShortS>
      <Grid container alignItems="center">
        <Grid item xs={12} md={6}>
          <Link href={`/blog/${data.slug}`}>
            <ImgSquare margin>
              <Image src={APP_API+data.image.data.attributes.url+"?format=webp&resize=535x420"} fill alt="" />
            </ImgSquare>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <ArticleContent>
            <div>
              {data.label?.data && <LabelBare data={data.label.data.attributes.title}/>}
              {date && <time style={{marginLeft: "20px"}}>{`${date.day}.${date.month}.${date.year}`}</time>}
            </div>
            <Link href={`/blog/${data.slug}`}><Typography variant="h2">{kitcut(data.title, 50)}</Typography></Link>
            <Typography className="short-content" dangerouslySetInnerHTML={{__html: kitcut(data.content.replace(/(<([^>]+)>)/gi, ""), 150)}} />
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