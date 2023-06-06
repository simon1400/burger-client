import styled from '@emotion/styled';
import CheckboxMui from '@mui/material/Checkbox';

export const CheckboxS = styled(CheckboxMui)(({theme}) => `
  margin-right: 10px;
  &.Mui-checked{
    svg{
      fill: ${theme.palette.primary.main};
    } 
  }
  svg{
    fill: rgba(255, 255, 255, 0.7);
  }
`)