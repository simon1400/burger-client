/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { FC } from 'react'

import { Container, Typography } from '@mui/material'
import Time from 'components/Time'
import { CenterWrap } from 'styles/CenterWrap'

import { BlockContentS, HeadWrap } from './styled'

const BlockContent: FC<IBlockContent> = ({ time, content, head }) => {
  return (
    <BlockContentS margin>
      <Container maxWidth={'md'}>
        <CenterWrap>
          <HeadWrap>
            {head && (
              <Typography variant={'h3'} component={'h2'}>
                {head}
              </Typography>
            )}
            {time && <Time from={time.from} to={time.to} />}
          </HeadWrap>
          {content && (
            <Typography
              component={'div'}
              dangerouslySetInnerHTML={{
                __html: content.replace(/\/uploads/g, 'https://burger-strapi.hardart.cz/uploads'),
              }}
            />
          )}
        </CenterWrap>
      </Container>
    </BlockContentS>
  )
}

export default BlockContent
