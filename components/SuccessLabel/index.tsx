import { useTranslations } from 'next-intl'

import { SuccessLabelS } from './styled'

const SuccessLabel = () => {
  const t = useTranslations('global')
  return <SuccessLabelS>{t('applicationSubbmited')}</SuccessLabelS>
}

export default SuccessLabel
