import { Container } from "@mui/material"
import { MapS } from "./styled"
import { FC, useEffect } from "react"

const Map: FC<{data: any}> = ({data}) => {
  console.log(data)

  useEffect(() => {
    if(data) {
      data.point.map((item: any) => {
        // @ts-ignore
        document.getElementById(item.idLayer).style.display = 'block'
      })
    } 
  }, [data])

  const handleClick = (e: any) => {
    console.log(e.target)
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