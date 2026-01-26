import type { FC } from 'react'

import { Container, Grid } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'

import GalleryGrid from './GaleryGrid'
import { GaleryS } from './styled'
import 'yet-another-react-lightbox/styles.css'

const Galery: FC<IGalery> = ({ modal = false, images, removePadding = false }) => {
  const [appApi, setAppApi] = useState('')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAppApi(process.env.APP_API || '')
    }
  }, [])

  const slides = useMemo(() => {
    if (!appApi || !images?.data) return []
    return images.data.map((item) => ({
      src: `${appApi}${item.attributes.url}?format=webp`,
    }))
  }, [appApi, images])

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  if (!appApi) return null

  return (
    <>
      <GaleryS modal={modal} removePadding={removePadding}>
        {!modal ? (
          <Container maxWidth={'xl'}>
            <GalleryGrid images={images} appApi={appApi} onImageClick={handleImageClick} />
          </Container>
        ) : (
          <Grid container>
            <GalleryGrid images={images} appApi={appApi} onImageClick={handleImageClick} />
          </Grid>
        )}
      </GaleryS>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      />
    </>
  )
}

export default Galery
