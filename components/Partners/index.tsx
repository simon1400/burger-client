import type { FC } from 'react'

import { Container, Grid } from '@mui/material'
import Head from 'components/Head'
import { getOptimizedImageUrl } from 'lib/imageUrl'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import PurpleBackground from 'public/img/backgrounds/footerPurple.svg'

import { LogoWrap, PartnersS } from './styled'

const APP_API = process.env.APP_API

export interface PartnerItem {
  url: string
  link?: string
}

interface PartnersProps {
  items: PartnerItem[]
  heading?: string
}

const PER_ROW_DESKTOP = 7
const PER_ROW_MOBILE = 3

const Partners: FC<PartnersProps> = ({ items, heading }) => {
  const t = useTranslations('global')

  if (!items?.length) return null

  const desktopCols = Math.min(items.length, PER_ROW_DESKTOP)
  const mobileCols = Math.min(items.length, PER_ROW_MOBILE)
  const headingText = heading ?? t('partners')

  return (
    <PartnersS>
      <Container>
        <div className={'footer-bg-purple'}>
          <PurpleBackground />
        </div>
        <Head className={'footer-head'} text={headingText} type={'h2'} bg={'yellow1'} />
        <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
          {items.map((item, idx) => {
            const img = (
              <LogoWrap>
                <Image
                  src={getOptimizedImageUrl(APP_API + item.url, {
                    format: 'webp',
                    resize: '300x200',
                  })}
                  fill
                  alt={''}
                  unoptimized
                />
              </LogoWrap>
            )
            return (
              <Grid
                key={idx}
                item
                sx={(theme) => ({
                  flexBasis: `${100 / mobileCols}%`,
                  maxWidth: `${100 / mobileCols}%`,
                  [theme.breakpoints.up('md')]: {
                    flexBasis: `${100 / desktopCols}%`,
                    maxWidth: `${100 / desktopCols}%`,
                  },
                })}
              >
                {item.link ? (
                  <Link href={item.link} target={'_blank'} rel={'noopener noreferrer'}>
                    {img}
                  </Link>
                ) : (
                  img
                )}
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </PartnersS>
  )
}

export default Partners
