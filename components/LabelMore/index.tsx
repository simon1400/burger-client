import type { FC } from 'react'

import { LabelMoreS } from './styled'

const LabelMore: FC<{ data: number }> = ({ data }) => {
  return (
    <LabelMoreS>
      {'+'}
      {data}
    </LabelMoreS>
  )
}

export default LabelMore
