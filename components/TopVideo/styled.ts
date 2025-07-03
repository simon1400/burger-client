import styled from '@emotion/styled'

export const TopVideoWraper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin-top: -222px;
  margin-bottom: -50px;
  @media (max-width: 700px) {
    margin-top: -95px;
  }
`
export const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
`
export const OverlayVideo = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to top, #0d0d0d, transparent);
  z-index: -1;
`
