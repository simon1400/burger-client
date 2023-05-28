import { FC } from "react"
import { ContactLineS } from "./styled"

const ContactLine: FC<IContactLine> = ({
  icon,
  link
}) => {
  return (
    <ContactLineS href={link}>
      {icon}
      <span>{link}</span>
    </ContactLineS>
  )
}

export default ContactLine