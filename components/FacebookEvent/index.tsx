import { FC } from "react"
import { FacebookEventS } from "./styled"
import FacebookIcon from 'public/img/facebook.svg'

const FacebookEvent: FC<IFacebookEvent> = ({single = false, data}) => {
  return (
    <FacebookEventS single={single} href={data} className="soc-events">
      <FacebookIcon />
      <span>událost</span>
    </FacebookEventS>
  )
}

export default FacebookEvent