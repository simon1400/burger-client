import { FC } from "react"
import { LabelS } from "./styled"
import LabelIcon from 'public/img/label.svg'
import Image from "next/image"

const APP_API = process.env.APP_API

const Label: FC<{data: any}> = ({data}) => {
  return (
    <LabelS>
      <Image src={APP_API+data.icon.data.attributes.url} width="25" height="25" alt="" />
      <span>{data.title}</span>
    </LabelS>
  )
}

export default Label