/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { FC } from 'react'

import { Container, Typography } from '@mui/material'
import Head from 'components/Head'
import Time from 'components/Time'
import { CenterWrap } from 'styles/CenterWrap'

import { BlockContentS, HeadWrap } from './styled'

const BlockContent: FC<IBlockContent> = ({ time, content, head, bg }) => {
  return (
    <BlockContentS margin>
      <Container maxWidth={'md'}>
        <CenterWrap>
          <HeadWrap>
            {head && <Head text={head} type={'h2'} bg={bg} />}
            {time && <Time from={time.from} to={time.to} />}
          </HeadWrap>
          {content && (
            <Typography
              component={'div'}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          )}
        </CenterWrap>
      </Container>
    </BlockContentS>
  )
}

export default BlockContent
