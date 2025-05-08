import HeadPurpleIcon from 'public/img/backgrounds/headPurple.svg'
import HeadRedIcon from 'public/img/backgrounds/headRed.svg'
import HeadYellow1Icon from 'public/img/backgrounds/headYellow1.svg'
import HeadYellow2Icon from 'public/img/backgrounds/headYellow2.svg'

import { HeadS } from './styled'

interface HeadProps {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  text: string
  className?: string
  bg?: 'red' | 'yellow1' | 'yellow2' | 'purple'
}

const bgIcons: Record<NonNullable<HeadProps['bg']>, JSX.Element> = {
  red: (
    <span className={'red-bg'}>
      <HeadRedIcon />
    </span>
  ),
  yellow1: (
    <span className={'yellow1-bg'}>
      <HeadYellow1Icon />
    </span>
  ),
  yellow2: (
    <span className={'yellow2-bg'}>
      <HeadYellow2Icon />
    </span>
  ),
  purple: (
    <span className={'purple-bg'}>
      <HeadPurpleIcon />
    </span>
  ),
}

const tagMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
} as const

const Head = ({ type, text, bg, className }: HeadProps) => {
  const isBlackColorText = bg === 'yellow1' || bg === 'yellow2'
  const Tag = tagMap[type] || 'div'

  return (
    <HeadS className={className}>
      <Tag className={isBlackColorText ? 'black-color' : ''}>{text}</Tag>
      {bg && bgIcons[bg]}
    </HeadS>
  )
}

export default Head
