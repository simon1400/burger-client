import { FC } from "react"
import { LabelS } from "./styled"
import Image from "next/image"

const APP_API = process.env.APP_API

const Label: FC<{data: any, modal?: boolean}> = ({data, modal = false}) => {
  return (
    <LabelS modal={modal}>
      <Image src={APP_API+data.icon.data.attributes.url+"?format=svg&resize=25x25"} width="25" height="25" alt="" />
      <span>{data.title}</span>
    </LabelS>
  )
}

export default Label