import { FC } from "react"
import { ErrorLabelS } from "./styled"

const ErrorLabel: FC<{content: string}> = ({content}) => {
  return (
    <ErrorLabelS>
      {content}
    </ErrorLabelS>
  )
}

export default ErrorLabel