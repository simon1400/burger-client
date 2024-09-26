import { Container, FormControlLabel, Typography } from "@mui/material"
import { LineupS } from "./styled"

import IconButton from "components/IconButton"
import ArrowRight from 'public/img/arrow-right.svg'
import FacebookEvent from "components/FacebookEvent"
import Label from "components/Label"
import { useDispatch } from "react-redux"
import { changeModal } from "stores/slices/stateSlices"
import { FC, useState } from "react"
import Image from "next/image"
import { Labels } from "styles/Labels"
import Time from "components/Time"
import { InInterval } from "helpers/inInterval"
import { CheckboxS } from "components/Checkbox/styled"
import Checkbox from "components/Checkbox"
import Link from "next/link"
import AdditionalLabel from "components/AdditionalLabel"

const APP_API = process.env.APP_API

const Lineup: FC<ILineup> = ({
  head,
  data,
  modal,
  registration = false,
  handleChange,
  hp = false
}) => {

  const dispatch = useDispatch()

  const [stateCheck, setStateCheck] = useState([])
  const [stateCheckAll, setStateCheckAll] = useState(false)

  const handleModal = (e: any, slug: string) => {
    e.preventDefault()
    dispatch(changeModal(slug))
  }

  const handleCheckAll = () => {
    const checkArr: [] = []
    setStateCheckAll(!stateCheckAll)
    if(!stateCheckAll) {
      data.map((item: any) => {
        if(item.state !== "obsazeno") {
          // @ts-ignore
          checkArr.push(item.from+" - "+item.to+" - "+item.title)
        }
      })
    }
    // @ts-ignore
    handleChange(checkArr)
    setStateCheck(checkArr)
  }

  const handleCheck = (value: string) => {
    let stateArr = [...stateCheck]
    const hasIndex = stateArr.findIndex((item) => item === value)
    if(hasIndex >= 0){
      stateArr = stateArr.splice(hasIndex, 1)
    }else{
      // @ts-ignore
      stateArr.push(value)
    }
    // @ts-ignore
    handleChange(stateArr)
    setStateCheck(stateArr)
  }

  const getState = (state: string) => {
    if(state === "volno") {
      return "volno"
    }else if(state === "obsazeno"){
      return "obsazeno"
    }else if(state === "nahradnik"){
      return "náhradník"
    }else if(state === "zbyva_1_misto") {
      return "zbývá 1 místo"
    }

    return null
  }

  return (
    <LineupS hp={hp}>
      <Container maxWidth="md">
        <Typography variant="h3">{head}</Typography>
        <ul className="events-list">
          {registration && <li className="select-all-wrap">
            <div>
              <FormControlLabel onClick={() => handleCheckAll()} checked={stateCheckAll} control={<Checkbox />} label="vybrat všechny" />
            </div>
            <div></div>
          </li>}
          {data.map((item: any, idx: number) => <li key={idx}>
            <div className={registration ? item.state : ""}>
              {/* @ts-ignore */}
              {registration && <CheckboxS onClick={() => handleCheck(item.from+" - "+item.to+" - "+item.title)} checked={stateCheck.indexOf(item.from+" - "+item.to+" - "+item.title) >= 0} sx={{ '& .MuiSvgIcon-root': { fontSize: 26 } }} />}
              {item.from && item.to && InInterval(item.from, item.to) && <span className="status"></span>}
              <div className={item.category?.data ? "basic-wrap" : "title-wrap"}>
                {item.from && item.to && <Time from={item.from} to={item.to} />}
                {!!item.category?.data?.length && <div className="icon-type">
                  <Image src={APP_API+item.category.data[0].attributes.icon.data.attributes.url} width={30} height={30} alt="" />
                </div>}
                {item.title && !modal && !!item.slug && item.full !== false ? <Link className="lineup-title" href={item.slug}><p>{item.title}</p></Link> : item.full === false ? <p>{item.title}</p> : null}
                {item.title && !!modal && !!item.slug && item.full !== false && <Link className="lineup-title" href={item.slug} onClick={(e) => handleModal(e, item.slug)}><p>{item.title}</p></Link>}
                {/* {item.title && modal && <p>{item.title}</p>} */}
                {item.name && <p>{item.name}</p>}
              </div>
              {item.labels?.data && <Labels>
                {item.labels.data.map((label: any, idx: number) => <Label key={idx} data={label.attributes} />)}
              </Labels>}
            </div>
            {!registration && <div>
              {item.showAddLabel && <AdditionalLabel />}
              {item.social && <FacebookEvent data={item.social} />}
              {!modal && !!item.slug && <IconButton href={item.slug}>
                <ArrowRight />
              </IconButton>}
              {!!modal && item.full !== false && <IconButton onClick={(e) => handleModal(e, item.slug)}>
                <ArrowRight />
              </IconButton>}
              {item?.number && <b>{item.number}</b>}
            </div>}
            {registration && <div className={`state ${item.state}`}>
              <label>{getState(item.state) || "volno"}</label>  
            </div>}
          </li>)}
        </ul>
      </Container>
    </LineupS>
  )
}

export default Lineup