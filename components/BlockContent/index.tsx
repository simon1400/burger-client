/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { FC } from 'react'

import { Container, Typography } from '@mui/material'
import Time from 'components/Time'
import { useLocale } from 'next-intl'
import { CenterWrap } from 'styles/CenterWrap'

import { BlockContentS, HeadWrap } from './styled'

const BlockContent: FC<IBlockContent> = ({ time, content, head }) => {
  const locale = useLocale()
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
            {locale === 'en' && time && <Time from={time.from} to={time.to} />}
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
