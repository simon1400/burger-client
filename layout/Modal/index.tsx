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

  const winner1 = seller.festival1.data.length;
  const winner2 = seller.festival2.data.length;
  const winner3 = seller.festival3.data.length;

  return (
    <ModalS
      fullWidth
      maxWidth="lg"
      open={!!modal?.length}
      scroll="body"
      onClose={handleClose}
    >
      <ModalBody>
        <TimesIcon onClick={() => handleClose()} className="times-icon" />
        <ModalContentWrap>
          <ImgCircle className="logo-img">
            <Image src={APP_API+seller.image.data.attributes.url+"?format=webp&resize=220x220"} fill alt="" />
          </ImgCircle>
          <Typography variant="h1">{seller.title}</Typography>
          <Labels className="labels-modal" modal>
            {seller.category.data.map((item: any, idx: number) => <Label data={item.attributes} modal />)}
            {seller.labels.data.map((item: any, idx: number) => <Label data={item.attributes} modal />)}
          </Labels>
          <Typography component="div" dangerouslySetInnerHTML={{__html: seller.content}}/>
          {!!seller.socials.length && <ul>
            {seller.socials.map((item: any, idx: number) => <li key={idx}>
              <Link href={item.link} target="_blank">{item.text}</Link>
            </li>)}
          </ul>}
          {(winner1 > 0 || winner2 > 0 || winner3 > 0) && <ModalWinners>
            {winner1 > 0 && <div>
              <b>{winner1}×</b>
              <span>1. místo</span>
            </div>}
            {winner2 > 0 && <div>
              <b>{winner2}×</b>
              <span>2. místo</span>
            </div>}
            {winner3 > 0 && <div>
              <b>{winner3}×</b>
              <span>3. místo</span>
            </div>}
          </ModalWinners>}
        </ModalContentWrap>
        <Galery images={seller.galery} modal />
      </ModalBody>
    </ModalS>
  )
}

export default Modal