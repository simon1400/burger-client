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

const Modal = () => {

  const dispatch = useDispatch()

  const {modal} = useSelector(selectAllState)

  const handleClose = () => {
    dispatch(changeModal(false))
  }

  return (
    <ModalS
      maxWidth="lg"
      open={modal}
      scroll="body"
      onClose={handleClose}
    >
      <ModalBody>
        <TimesIcon onClick={() => handleClose()} className="times-icon" />
        <ModalContentWrap>
          <ImgCircle className="logo-img">
            <Image src="/img/winner.webp" fill alt="" />
          </ImgCircle>
          <Typography variant="h1">Pablo Escobar</Typography>
          <Labels className="labels-modal">
            {/* <Label />
            <Label /> */}
          </Labels>
          <Typography>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque pretium lectus id turpis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas sollicitudin. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Praessto inelementum ultrices.</Typography>
          <ul>
            <li>
              <Link href="/">odkaz</Link>
            </li>
            <li>
              <Link href="/">odkaz</Link>
            </li>
            <li>
              <Link href="/">odkaz</Link>
            </li>
          </ul>
          <ModalWinners>
            <div>
              <b>3x</b>
              <span>1. misto</span>
            </div>
            <div>
              <b>3x</b>
              <span>1. misto</span>
            </div>
            <div>
              <b>3x</b>
              <span>1. misto</span>
            </div>
          </ModalWinners>
        </ModalContentWrap>
        {/* <Galery modal /> */}
      </ModalBody>
    </ModalS>
  )
}

export default Modal