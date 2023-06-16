import { FC } from "react"
import { AdditionalLabelS } from "./styled"
import Image from "next/image"
import { useQuery } from "@apollo/client"
import { additionalLabelQuery } from "queries/additionalLabel"

const APP_API = process.env.APP_API

const AdditionalLabel: FC = () => {


  const {data, loading} = useQuery(additionalLabelQuery)

  if(loading) {
    return null
  }

  const label = data.global.data.attributes.additionalLabel

  return (
    <AdditionalLabelS href={label.link}>
      <Image src={APP_API+label.icon.data.attributes.url} width="45" height="45" alt="" />
      <span>{label.text}</span>
    </AdditionalLabelS>
  )
}

export default AdditionalLabel