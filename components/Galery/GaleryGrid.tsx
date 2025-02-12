import type { FC } from 'react'

import { Grid } from '@mui/material'
import LabelMore from 'components/LabelMore'
import Image from 'next/image'
import { useMemo } from 'react'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import { LightgalleryItem } from 'react-lightgallery'

import { GaleryItem } from './styled'
import { getGridSize, getImageUrl } from './utils'

interface GalleryGridProps {
  images: IImages
  appApi: string
}

const GalleryGrid: FC<GalleryGridProps> = ({ images, appApi }) => {
  const length = useMemo(() => images.data.length, [images])
  const visibleImages = useMemo(() => images.data.slice(0, 8), [images])
  const hiddenImages = useMemo(() => images.data.slice(8), [images])

  return (
    <Grid container>
      {visibleImages.map((item, idx) => {
        const imageUrl = getImageUrl(appApi, item.attributes.url, length)

        return (
          <Grid key={idx} item xs={6} md={getGridSize(length)}>
            <LightgalleryItem group={'any'} component={'div'} src={imageUrl}>
              <GaleryItem>
                <a href={imageUrl} onClick={(e) => e.preventDefault()}>
                  <Image src={imageUrl} fill alt={''} />
                  {length > 8 && idx === 7 && <LabelMore data={hiddenImages.length} />}
                </a>
              </GaleryItem>
            </LightgalleryItem>
          </Grid>
        )
      })}

      {hiddenImages.map((item, idx) => {
        const imageUrl = getImageUrl(appApi, item.attributes.url, length)

        return (
          <Grid
            key={`hidden-${idx}`}
            item
            xs={6}
            md={getGridSize(length)}
            style={{ display: 'none' }}
          >
            <LightgalleryItem group={'any'} component={'div'} src={imageUrl}>
              <GaleryItem>
                <a href={imageUrl} onClick={(e) => e.preventDefault()}>
                  <Image src={imageUrl} fill alt={''} />
                </a>
              </GaleryItem>
            </LightgalleryItem>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default GalleryGrid
