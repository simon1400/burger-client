import { Container } from "@mui/material"
import { MapS } from "./styled"
import { FC, useEffect } from "react"
import { useRouter } from "next/router"

const Map: FC<{data: any}> = ({data}) => {

  const router = useRouter()

  useEffect(() => {
    if(data) {
      data.point.map((item: any) => {
        // @ts-ignore
        document.getElementById(item.idLayer).style.display = 'block'
      })
    } 
  }, [data])

  const handleClick = (e: any) => {
    data.point.map((item: any) => {
      if(e.target.id.split('-')[0] === item.idLayer) {
        router.push(`/${item.festival.data.attributes.slug}`)
      }
    })
  }

  return (
    <Container>
      <MapS>
        <div onClick={e => handleClick(e)} dangerouslySetInnerHTML={{__html: data.map}} />
      </MapS>
    </Container>
  )
}

export default Map