import type { FC } from 'react'

import { FormControlLabel } from '@mui/material'
import Checkbox from 'components/Checkbox'

import { SelectS } from './styled'

const Select: FC<{
  data: any
  idKey: string
  handleChange: (value: string, idKey: string) => void
  errorText?: string
  error?: boolean
}> = ({ data, idKey, handleChange, errorText, error }) => {
  return (
    <SelectS>
      <div className={'label-wrap'}>
        <label>{idKey}</label>
        {error && <span>{errorText}</span>}
      </div>
      {data.map((item: any, idx: number) => (
        <FormControlLabel
          key={idx}
          onClick={() => handleChange(item.label, idKey)}
          control={<Checkbox />}
          label={item.label}
        />
      ))}
    </SelectS>
  )
}

export default Select
