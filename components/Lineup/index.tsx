import { Container, Typography } from "@mui/material"
import { LineupS } from "./styled"

import IconButton from "components/IconButton"
import ArrowRight from 'public/img/arrow-right.svg'
import Button from "components/Button"
import FacebookEvent from "components/FacebookEvent"
import IconType from 'public/img/type.svg'
import Label from "components/Label"
import { useDispatch } from "react-redux"
import { changeModal } from "stores/slices/stateSlices"
import { FC } from "react"
import Image from "next/image"
import { Labels } from "styles/Labels"

const APP_API = process.env.APP_API

const Lineup: FC<ILineup> = ({
  head,
  data
}) => {

  const dispatch = useDispatch()

  const handleModal = () => {
    dispatch(changeModal(true))
  }

  return (
    <LineupS>
      <Container maxWidth="md">
        <Typography variant="h3">{head}</Typography>
        <ul className="events-list">
          {data.map((item: any, idx: number) => <li key={idx}>
            <div>
              {/* <span className="status"></span> */}
              {item.from && item.to && <time>{item.from} - {item.to}</time>}
              {item.category?.data && <div className="icon-type">
                <Image src={APP_API+item.category.data.attributes.icon.data.attributes.url} width={30} height={30} alt="" />
              </div>}
              {item.title && <p>{item.title}</p>}
              {item.name && <p>{item.name}</p>}
              {item.labels?.data && <Labels>
                {item.labels.data.map((label: any, idx: number) => <Label key={idx} data={label.attributes} />)}
              </Labels>}
            </div>
            <div>
              {item.social && <FacebookEvent data={item.social} />}
              {item.slug && <IconButton href={item.slug}>
                <ArrowRight />
              </IconButton>}
              {/* <IconButton onClick={handleModal}>
                <ArrowRight />
              </IconButton> */}
              {item?.number && <b>{item.number}</b>}
            </div>
          </li>)}
        </ul>
        {/* <Button>další akce</Button> */}
      </Container>
    </LineupS>
  )
}

export default Lineup