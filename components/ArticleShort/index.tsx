/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { FC } from 'react'

import { Grid, Typography } from '@mui/material'
import IconButton from 'components/IconButton'
import LabelBare from 'components/LabelBare'
import { kitcut } from 'helpers/kitkut'
import { parseDate } from 'helpers/parseDate'
import Image from 'next/image'
import Link from 'next/link'
import ArrowRight from 'public/img/arrow-right.svg'
import ArticleBgPurple from 'public/img/backgrounds/articlePurple.svg'
import ArticleBgRed from 'public/img/backgrounds/articleRed.svg'
import ArticleBgYellow from 'public/img/backgrounds/articleYellow.svg'
import { ImgSquare } from 'styles/ImgSquare'

import { ArticleContent, ArticleShortS } from './styled'

const APP_API = process.env.APP_API

const ArticleShort: FC<{ data: any; type?: string, bg?: 'red'|'yellow'|'purple' }> = ({ data, type = 'blog', bg }) => {
  const date = data.datePublication ? parseDate(data.datePublication) : null

  return (
    <ArticleShortS>
      <Grid container alignItems={'center'}>
        <Grid item xs={12} md={6}>
          <Link href={`/${type}/${data.slug}`}>
            <ImgSquare margin>
              <Image
                src={`${APP_API + data.image.data.attributes.url}?format=webp&resize=535x420`}
                fill
                alt={''}
              />
            </ImgSquare>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <ArticleContent>
            {bg && <div className={'article-bg'}>
              {bg === 'purple' && <ArticleBgPurple />}
              {bg === 'red' && <ArticleBgRed />}
              {bg === 'yellow' && <ArticleBgYellow />}
            </div>}
            <div>
              {data.label?.data && <LabelBare data={data.label.data.attributes.title} />}
              {date && (
                <time
                  style={{ marginLeft: '20px' }}
                >{`${date.day}.${date.month + 1}.${date.year}`}</time>
              )}
            </div>
            <Link href={`/${type}/${data.slug}`}>
              <Typography variant={'h2'}>{kitcut(data.title, 50)}</Typography>
            </Link>
            <Typography
              className={'short-content'}
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line sonarjs/slow-regex
                __html: kitcut(data.content.replace(/(<([^>]+)>)/g, ''), 150),
              }}
            />
            <IconButton href={`/${type}/${data.slug}`}>
              <ArrowRight />
            </IconButton>
          </ArticleContent>
        </Grid>
      </Grid>
    </ArticleShortS>
  )
}

export default ArticleShort
