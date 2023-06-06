import { Container, Typography } from "@mui/material"
import { BlockContentS, HeadWrap } from "./styled"
import { FC } from "react"
import { CenterWrap } from "styles/CenterWrap"
import Time from "components/Time"

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
            {head && <Typography variant="h3" component="h2">{head}</Typography>}
            {time && <Time from={time.from} to={time.to} />}
          </HeadWrap>
          {content && <Typography component="div" dangerouslySetInnerHTML={{__html: content}}/>}
        </CenterWrap>
      </Container>
    </BlockContentS>
  )
}

export default BlockContent