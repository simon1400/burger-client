import { FC } from "react"
import { ContactLineS } from "./styled"

const ContactLine: FC<IContactLine> = ({
  icon,
  link,
  title
}) => {
  return (
    <ContactLineS href={link}>
      {icon}
      <span>{title}</span>
    </ContactLineS>
  )
}

export default ContactLine