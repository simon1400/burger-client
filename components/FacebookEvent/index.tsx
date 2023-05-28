import { FC } from "react"
import { FacebookEventS } from "./styled"
import FacebookIcon from 'public/img/facebook.svg'

const FacebookEvent: FC<IFacebookEvent> = ({single}) => {
  return (
    <FacebookEventS single={single} href="/" className="soc-events">
      <FacebookIcon />
      <span>událost</span>
    </FacebookEventS>
  )
}

export default FacebookEvent