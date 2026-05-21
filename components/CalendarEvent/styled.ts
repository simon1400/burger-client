import styled from '@emotion/styled'
import { candal } from 'styles/typography/baseHead'

export const CalendarEventWrap = styled.div<{ single: boolean }>(
  ({ single }) => `
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${single ? '40px' : '0px'};
  margin-bottom: ${single ? '80px' : '0px'};
`,
)

const SHAPE = 'polygon(0% 11%, 2.5% 100%, 44% 100%, 75% 89%, 100% 95%, 100% 0%, 58% 14%, 51% 0%)'

export const CalendarEventS = styled.a(
  ({ theme }) => `
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 82px;
  padding: 0 50px 0 75px;
  color: white;
  text-decoration: none;
  background-color: #d9291c;
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
    font-family: ${candal.style.fontFamily};
    text-decoration: underline;
    text-underline-offset: 4px;
    font-size: 28px;
    letter-spacing: 0.02em;
    white-space: nowrap;
    line-height: 1;
  }
  > .content svg{
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    display: block;
  }
  &:hover{
    filter: brightness(1.08);
  }
  ${theme.breakpoints.down('md')} {
    height: 68px;
    padding: 0 40px 0 55px;
    .label{
      font-size: 20px;
    }
    > .content svg{
      width: 30px;
      height: 30px;
    }
  }
`,
)
