import { OverlayVideo, TopVideoWraper, Video } from './styled'

export const TopVideo = () => {
  return (
    <TopVideoWraper>
      <Video autoPlay muted loop playsInline>
        <source src={'/video/top_v.mp4'} type={'video/mp4'} />
        {'Your browser does not support the video tag.\r'}
      </Video>
      <OverlayVideo />
    </TopVideoWraper>
  )
}
