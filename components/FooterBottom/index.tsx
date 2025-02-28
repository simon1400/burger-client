import type { FC } from 'react'

import { Container } from '@mui/material'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { FooterBottomS } from './styled'

const FooterBottom: FC<{ phone: string; email: string }> = ({ phone, email }) => {
  const t = useTranslations('global')
  return (
    <Container maxWidth={'xl'}>
      <FooterBottomS>
        <div>
          <Link href={`mailto:${email}`}>{email}</Link>
          <Link href={`tel:${phone}`}>{phone}</Link>
        </div>
        <div>
          <div>
            <Link href={'/clanek/kariera'}>{t('carier')}</Link>
          </div>
          <div>
            <Link href={'/'}>{t('settingCookies')}</Link>
          </div>
        </div>
      </FooterBottomS>
    </Container>
  )
}

export default FooterBottom
