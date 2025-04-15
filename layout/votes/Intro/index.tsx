import type { FC } from 'react'

import BlockContent from 'components/BlockContent'
import Button from 'components/Button'
import Head from 'components/Head'
import Page from 'layout/Page'
import { useTranslations } from 'next-intl'
import { CenterWrap } from 'styles/CenterWrap'

const Intro: FC<{ link: string; festivals: any }> = ({ link, festivals }) => {
  const t = useTranslations('global')
  const tVotes = useTranslations('votes')
  return (
    <Page>
      <div style={{ margin: '40px 0 100px' }}>
        <Head text={festivals.title} type={'h1'} />
        <BlockContent head={festivals.place} margin content={tVotes('intro.text')} />
        <CenterWrap marginBottom={80}>
          <Button href={`/${link}/${festivals.slug}`}>{t('startVotes')}</Button>
        </CenterWrap>
      </div>
    </Page>
  )
}

export default Intro
