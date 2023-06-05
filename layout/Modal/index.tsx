import { ModalBody, ModalContentWrap, ModalS, ModalWinners } from "./styled"
import { useDispatch, useSelector } from "react-redux"
import { changeModal, selectAllState } from "stores/slices/stateSlices"
import TimesIcon from 'public/img/times.svg'
import { ImgCircle } from "styles/ImgCircle"
import Image from "next/image"
import Galery from "components/Galery"
import { Labels } from "styles/Labels"
import Label from "components/Label"
import { Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { getSeller } from "queries/sellers"

const APP_API = process.env.APP_API

const Modal = () => {

  const dispatch = useDispatch()

  const {modal} = useSelector(selectAllState)
  const [getData, {data, loading}] = useLazyQuery(getSeller)

  const handleClose = () => {
    dispatch(changeModal(""))
  }

  useEffect(() => {
    console.log(modal)
    if(modal) {
      getData({variables: {
        slug: modal
      }})
    }
  }, [modal])

  if(!data?.sellers.data.length) {
    return null
  }

  

  const seller = data.sellers.data[0].attributes

  return (
    <ModalS
      fullWidth
      maxWidth="lg"
      open={!!modal.length}
      scroll="body"
      onClose={handleClose}
    >
      <ModalBody>
        <TimesIcon onClick={() => handleClose()} className="times-icon" />
        <ModalContentWrap>
          <ImgCircle className="logo-img">
            <Image src={APP_API+seller.image.data.attributes.url} fill alt="" />
          </ImgCircle>
          <Typography variant="h1">{seller.title}</Typography>
          <Labels className="labels-modal" modal>
            {seller.category.data.map((item: any, idx: number) => <Label data={item.attributes} modal />)}
            {seller.labels.data.map((item: any, idx: number) => <Label data={item.attributes} modal />)}
          </Labels>
          <Typography component="div" dangerouslySetInnerHTML={{__html: seller.content}}/>
          {!!seller.socials.length && <ul>
            {seller.socials.map((item: any, idx: number) => <li key={idx}>
              <Link href={item.link}>{item.text}</Link>
            </li>)}
          </ul>}
          <ModalWinners>
            <div>
              <b>{seller.festival1.data.length}x</b>
              <span>1. misto</span>
            </div>
            <div>
              <b>{seller.festival2.data.length}x</b>
              <span>2. misto</span>
            </div>
            <div>
              <b>{seller.festival3.data.length}x</b>
              <span>3. misto</span>
            </div>
          </ModalWinners>
        </ModalContentWrap>
        <Galery images={seller.galery} modal />
      </ModalBody>
    </ModalS>
  )
}

export default Modal