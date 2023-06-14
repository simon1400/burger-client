import { Container, useMediaQuery } from "@mui/material"
import Winner from "components/Winner"
import { WinnersS } from "./styled"
import { FC } from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css";

const Winners: FC<{
  winner1: IWinner;
  winner2: IWinner;
  winner3: IWinner;
  margin?: boolean
}> = ({
  winner1,
  winner2,
  winner3,
  margin = false
}) => {

  const mediaMd = useMediaQuery("(max-width: 940px)")

  if(!winner1.data && !winner1.data && !winner1.data) {
    return null
  }

  return (
    <WinnersS margin={margin}>
      <Container maxWidth="md">
        <Swiper
          slidesPerView={mediaMd ? 1 : 3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {winner1.data && <SwiperSlide>
            <Winner place="1" data={winner1} />
          </SwiperSlide>}
          {winner2.data && <SwiperSlide>
            <Winner place="2" data={winner2} />
          </SwiperSlide>}
          {winner3.data && <SwiperSlide>
            <Winner place="3" data={winner3} />
          </SwiperSlide>}
        </Swiper>
      </Container>
    </WinnersS>
  )
}

export default Winners