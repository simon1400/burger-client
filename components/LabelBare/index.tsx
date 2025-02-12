import type { FC } from 'react'

import { LabelBareS } from './styled'

const LabelBare: FC<{ data: string }> = ({ data }) => {
  return <LabelBareS>{data}</LabelBareS>
}

export default LabelBare
