import type { FC } from 'react'

import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import { LightgalleryProvider } from 'react-lightgallery'

import GalleryGrid from './GaleryGrid'
import { GaleryS } from './styled'
import 'lightgallery.js/dist/css/lightgallery.css'

const Galery: FC<IGalery> = ({ modal = false, images, removePadding = false }) => {
  const [appApi, setAppApi] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAppApi(process.env.APP_API || '')
    }
  }, [])

  if (!appApi) return null

  return (
    <LightgalleryProvider galleryClassName={'lightbox-galery'}>
      <GaleryS modal={modal} removePadding={removePadding}>
        {!modal ? (
          <Container maxWidth={'xl'}>
            <GalleryGrid images={images} appApi={appApi} />
          </Container>
        ) : (
          <Grid container>
            <GalleryGrid images={images} appApi={appApi} />
          </Grid>
        )}
      </GaleryS>
    </LightgalleryProvider>
  )
}

export default Galery
