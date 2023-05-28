import { FC } from "react"
import { ContactItemS } from "./styled"
import { ImgCircle } from "styles/ImgCircle"
import Image from "next/image"
import { Typography } from "@mui/material"
import Link from "next/link"

const ContactItem: FC<IContactItem> = ({}) => {
  return (
    <ContactItemS>
      <ImgCircle>
        <Image src="/img/winner.webp" fill alt="" />
      </ImgCircle>
      <Typography variant="h3">Dimi Pechunka</Typography>
      <Typography>jednatel</Typography>
      <Link href="mailto:dmytro@pechunka.com">mail@gmail.com</Link>
    </ContactItemS>
  )
}

export default ContactItem