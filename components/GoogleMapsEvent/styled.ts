import styled from '@emotion/styled'

const SHAPE = 'polygon(100% 93.2%, 96.8% 0%, 29.4% 12.8%, 1.5% 0%, 0% 100%, 68.2% 82.3%)'

export const GoogleMapsEventS = styled.a(
  ({ theme }) => `
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 82px;
  padding: 0 35px 0 55px;
  color: white;
  text-decoration: none;
  background-color: #214518;
  -webkit-clip-path: ${SHAPE};
  clip-path: ${SHAPE};
  transition: filter .2s ease;
  > .content{
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }
  .label{
    font-family: 'veneer', sans-serif;
    text-decoration: underline;
    text-underline-offset: 4px;
    font-size: 28px;
    letter-spacing: 0.02em;
    white-space: nowrap;
    line-height: 1;
  }
  > .content img,
  > .content svg{
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    display: block;
  }
  &:hover{
    filter: brightness(1.08);
  }
  ${theme.breakpoints.down('md')} {
    height: 68px;
    padding: 0 30px 0 45px;
    .label{
      font-size: 20px;
    }
    > .content img,
    > .content svg{
      width: 24px;
      height: 24px;
    }
  }
`,
)
