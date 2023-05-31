import { FC } from "react"
import { ContactItemS } from "./styled"
import { ImgCircle } from "styles/ImgCircle"
import Image from "next/image"
import { Typography } from "@mui/material"
import Link from "next/link"

const APP_API = process.env.APP_API

const ContactItem: FC<IContactItem> = ({data}) => {
  return (
    <ContactItemS>
      <ImgCircle>
        <Image src={APP_API+data.image.data.attributes.url} fill alt="" />
      </ImgCircle>
      <Typography variant="h3">{data.title}</Typography>
      <Typography>{data.function}</Typography>
      <Link href={`mailto:${data.email}`}>{data.email}</Link>
    </ContactItemS>
  )
}

export default ContactItem