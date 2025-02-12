/* eslint-disable array-callback-return */
import type { FC } from 'react'

import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { MapS } from './styled'

const MapComponent: FC<{ data: any }> = ({ data }) => {
  const router = useRouter()

  useEffect(() => {
    if (data) {
      data.point.map((item: any) => {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        document.getElementById(item.idLayer).style.display = 'block'
      })
    }
  }, [data])

  const handleClick = (e: any) => {
    data.point.map((item: any) => {
      if (e.target.id.split('-')[0] === item.idLayer) {
        router.push(`/${item.festival.data.attributes.slug}`)
      }
    })
  }

  return (
    <Container>
      <MapS>
        <div onClick={(e) => handleClick(e)} dangerouslySetInnerHTML={{ __html: data.map }} />
      </MapS>
    </Container>
  )
}

export default MapComponent
