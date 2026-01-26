import type { FC } from 'react'

import { Grid } from '@mui/material'
import LabelMore from 'components/LabelMore'
import Image from 'next/image'
import { useMemo } from 'react'

import { GaleryItem } from './styled'
import { getGridSize, getImageUrl } from './utils'

interface GalleryGridProps {
  images: IImages
  appApi: string
  onImageClick: (index: number) => void
}

const GalleryGrid: FC<GalleryGridProps> = ({ images, appApi, onImageClick }) => {
  const length = useMemo(() => images.data.length, [images])
  const visibleImages = useMemo(() => images.data.slice(0, 8), [images])
  const hiddenImages = useMemo(() => images.data.slice(8), [images])

  return (
    <Grid container>
      {visibleImages.map((item, idx) => {
        const imageUrl = getImageUrl(appApi, item.attributes.url, length)

        return (
          <Grid key={idx} item xs={6} md={getGridSize(length)}>
            <GaleryItem onClick={() => onImageClick(idx)} style={{ cursor: 'pointer' }}>
              <Image src={imageUrl} fill alt={''} />
              {length > 8 && idx === 7 && <LabelMore data={hiddenImages.length} />}
            </GaleryItem>
          </Grid>
        )
      })}

      {hiddenImages.map((item, idx) => {
        const imageUrl = getImageUrl(appApi, item.attributes.url, length)
        const actualIndex = 8 + idx

        return (
          <Grid
            key={`hidden-${idx}`}
            item
            xs={6}
            md={getGridSize(length)}
            style={{ display: 'none' }}
          >
            <GaleryItem onClick={() => onImageClick(actualIndex)} style={{ cursor: 'pointer' }}>
              <Image src={imageUrl} fill alt={''} />
            </GaleryItem>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default GalleryGrid
