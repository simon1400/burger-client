import { StandardTextFieldProps } from "@mui/material";
import { FC } from "react";
import { InputS, InputWrap } from "./styled";

interface IInput extends StandardTextFieldProps {
  errorText: string;
}

const Input: FC<IInput> = ({
  error = false,
  errorText,
  helperText,
  label,
  disabled = false,
  ...rest
}) => {
  return (
    <InputWrap error={error} disabled={disabled}>
      <div className="label-wrap">
        <label>{label}</label>
        {error && <span>{errorText}</span>}
      </div>
      <InputS error={error} disabled={disabled} {...rest} label="" helperText="" variant="outlined" />
      <span className="helper-text">{helperText}</span>
    </InputWrap>
  );
};

export default Input;
