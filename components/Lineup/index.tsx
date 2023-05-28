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

const Lineup = () => {

  const dispatch = useDispatch()

  const handleModal = () => {
    dispatch(changeModal(true))
  }

  return (
    <LineupS>
      <Container maxWidth="md">
        <Typography variant="h3">Nejbližší akce</Typography>
        <ul className="events-list">
          <li>
            <div>
              {/* <span className="status"></span>
              <time>28.4. - 30.4. 2023</time>
              <p>{"Olomouc (Galerie Šantovka)"}</p> */}
              {/* <div className="icon-type">
                <IconType />
              </div> */}
              <p>Pablo Escobar</p>
              {/* <Labels>
                <Label />
                <Label />
              </Labels> */}
            </div>
            <div>
              {/* <FacebookEvent /> */}
              <IconButton onClick={handleModal}>
                <ArrowRight />
              </IconButton>
              {/* <b>ABCD1234</b> */}
            </div>
          </li>
        </ul>
        <Button>další akce</Button>
      </Container>
    </LineupS>
  )
}

export default Lineup