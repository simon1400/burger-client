import { Grid, Typography } from "@mui/material"
import { ArticleContent, ArticleShortS } from "./styled"
import Image from "next/image"
import { ImgSquare } from "styles/ImgSquare"
import LabelBare from "components/LabelBare"
import IconButton from "components/IconButton"
import ArrowRight from 'public/img/arrow-right.svg'

const ArticleShort = () => {
  return (
    <ArticleShortS>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <ImgSquare margin>
            <Image src="/img/img.webp" fill alt="" />
          </ImgSquare>
        </Grid>
        <Grid item xs={6}>
          <ArticleContent>
            <LabelBare />
            <Typography variant="h2">Nadpis some</Typography>
            <Typography className="short-content" component="div"><p>Nadpis some text</p></Typography>
            <IconButton>
              <ArrowRight />
            </IconButton>
          </ArticleContent>
        </Grid>
      </Grid>
    </ArticleShortS>
  )
}

export default ArticleShort