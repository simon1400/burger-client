import styled from '@emotion/styled'
import Link from 'next/link'

const SHAPE = 'polygon(0% 6.8%, 3.2% 100%, 70.6% 87.2%, 98.5% 100%, 100% 0%, 31.8% 17.7%)'

export const FacebookEventS = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'single',
})<{ single: boolean }>(
  ({ theme, single }) => `
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${single ? '82px' : '52px'};
  padding: ${single ? '0 35px 0 55px' : '0 22px 0 32px'};
  margin-right: ${single ? '0' : '16px'};
  color: white;
  text-decoration: none;
  background-color: #082f60;
  -webkit-clip-path: ${SHAPE};
  clip-path: ${SHAPE};
  transition: filter .2s ease;
  > .content{
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: ${single ? '12px' : '8px'};
  }
  .label{
    font-family: 'veneer', sans-serif;
    text-decoration: underline;
    text-underline-offset: 4px;
    font-size: ${single ? '28px' : '20px'};
    letter-spacing: 0.02em;
    white-space: nowrap;
    line-height: 1;
  }
  > .content img,
  > .content svg{
    width: ${single ? '32px' : '22px'};
    height: ${single ? '32px' : '22px'};
    flex-shrink: 0;
    display: block;
  }
  &:hover{
    filter: brightness(1.08);
  }
  ${theme.breakpoints.down('md')} {
    height: ${single ? '68px' : '44px'};
    padding: ${single ? '0 30px 0 45px' : '0 18px 0 26px'};
    .label{
      font-size: ${single ? '20px' : '15px'};
    }
    > .content img,
    > .content svg{
      width: ${single ? '24px' : '18px'};
      height: ${single ? '24px' : '18px'};
    }
  }
`,
)
