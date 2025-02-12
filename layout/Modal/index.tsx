import { useLazyQuery } from '@apollo/client'
import { Typography } from '@mui/material'
import Galery from 'components/Galery'
import Label from 'components/Label'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TimesIcon from 'public/img/times.svg'
import { getSeller } from 'queries/sellers'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeModal, selectAllState } from 'stores/slices/stateSlices'
import { ImgCircle } from 'styles/ImgCircle'
import { Labels } from 'styles/Labels'

import { ModalBody, ModalContentWrap, ModalS, ModalWinners } from './styled'

const APP_API = process.env.APP_API

const Modal = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { modal } = useSelector(selectAllState)
  const [getData, { data }] = useLazyQuery(getSeller, {
    variables: {
      locale: router.locale,
    },
  })

  const handleClose = () => {
    dispatch(changeModal(''))
  }

  useEffect(() => {
    if (modal) {
      getData({
        variables: {
          slug: modal,
          locale: router.locale,
        },
      })
    }
  }, [modal])

  if (!data?.sellers.data.length) {
    return null
  }

  const seller = data.sellers.data[0].attributes

  const winner1 = seller.festival1.data.length
  const winner2 = seller.festival2.data.length
  const winner3 = seller.festival3.data.length

  return (
    <ModalS fullWidth maxWidth={'lg'} open={!!modal?.length} scroll={'body'} onClose={handleClose}>
      <ModalBody>
        <TimesIcon onClick={() => handleClose()} className={'times-icon'} />
        <ModalContentWrap>
          <ImgCircle className={'logo-img'}>
            <Image
              src={`${APP_API + seller.image.data.attributes.url}?format=webp&resize=220x220`}
              fill
              alt={''}
            />
          </ImgCircle>
          <Typography variant={'h1'}>{seller.title}</Typography>
          <Labels className={'labels-modal'} modal>
            {seller.category.data.map((item: any, idx: number) => (
              <Label key={item.attributes.title} data={item.attributes} modal />
            ))}
            {seller.labels.data.map((item: any, idx: number) => (
              <Label key={item.attributes.title} data={item.attributes} modal />
            ))}
          </Labels>
          <Typography component={'div'} dangerouslySetInnerHTML={{ __html: seller.content }} />
          {!!seller.socials.length && (
            <ul>
              {seller.socials.map((item: any, idx: number) => (
                <li key={idx}>
                  <Link href={item.link} target={'_blank'}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {(winner1 > 0 || winner2 > 0 || winner3 > 0) && (
            <ModalWinners>
              {winner1 > 0 && (
                <div>
                  <b>
                    {winner1}
                    {'×'}
                  </b>
                  <span>{'1. místo'}</span>
                </div>
              )}
              {winner2 > 0 && (
                <div>
                  <b>
                    {winner2}
                    {'×'}
                  </b>
                  <span>{'2. místo'}</span>
                </div>
              )}
              {winner3 > 0 && (
                <div>
                  <b>
                    {winner3}
                    {'×'}
                  </b>
                  <span>{'3. místo'}</span>
                </div>
              )}
            </ModalWinners>
          )}
        </ModalContentWrap>
        <Galery images={seller.galery} modal />
      </ModalBody>
    </ModalS>
  )
}

export default Modal
