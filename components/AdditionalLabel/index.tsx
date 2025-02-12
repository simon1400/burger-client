import type { FC } from 'react'

import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { additionalLabelQuery } from 'queries/additionalLabel'

import { AdditionalLabelS } from './styled'

const APP_API = process.env.APP_API

const AdditionalLabel: FC = () => {
  const router = useRouter()
  const { data, loading } = useQuery(additionalLabelQuery, {
    variables: {
      locale: router.locale,
    },
  })

  if (loading) {
    return null
  }

  const label = data.global.data.attributes.additionalLabel

  return (
    <AdditionalLabelS href={label.link}>
      <Image src={APP_API + label.icon.data.attributes.url} width={'45'} height={'45'} alt={''} />
      <span>{label.text}</span>
    </AdditionalLabelS>
  )
}

export default AdditionalLabel
