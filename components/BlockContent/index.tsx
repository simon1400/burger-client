import { Container, Typography } from "@mui/material"
import { BlockContentS, HeadWrap } from "./styled"
import { FC } from "react"
import { CenterWrap } from "styles/CenterWrap"

const BlockContent: FC<IBlockContent> = ({
  time, 
  content, 
  head,
  margin}) => {
  return (
    <BlockContentS margin>
      <Container maxWidth="md">
        <CenterWrap>
          <HeadWrap>
            {head && <Typography variant="h2">{head}</Typography>}
            {time && <time>28.4. - 30.4. 2023</time>}
          </HeadWrap>
          {content && <Typography component="div" dangerouslySetInnerHTML={{__html: content}}/>}
        </CenterWrap>
      </Container>
    </BlockContentS>
  )
}

export default BlockContent