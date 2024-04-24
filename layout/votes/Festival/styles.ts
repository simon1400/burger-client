import styled from "@emotion/styled"
export const ControlCheckbox = styled.div(({theme}) => `
  .label-checkbox{
    span{
      display: block;
      margin-top: -20px;
      color: ${theme.palette.primary.main};
    }
  }
`)
export const ControledCodesS = styled.div(({theme}) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  a{
    color: ${theme.palette.primary.main};
  }
`)


export const CodeInput = styled.div(({theme}) => `
  position: relative;
  svg{
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
  >span{
    position: absolute;
    right: 10px;
    bottom: 8px;
    color: ${theme.palette.primary.main};
  }
`)

export const PulusS = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 30px;
  &:hover{
    svg{
      transform: rotate(-180deg);
    }
  }
  svg{
    margin-right: 10px;
    transition: all .2s ease;
    margin-top: -2px;
  }
`