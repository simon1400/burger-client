import { StandardTextFieldProps } from "@mui/material";
import { FC } from "react";
import { InputS, InputWrap } from "./styled";

interface IInput extends StandardTextFieldProps {
  errorText?: string;
  handleChange: (value: string, key: string) => void;
  idKey: string;
}

const Input: FC<IInput> = ({
  error = false,
  errorText,
  helperText,
  label,
  idKey,
  handleChange,
  disabled = false,
  required,
  ...rest
}) => {
  return (
    <InputWrap error={error} disabled={disabled}>
      <div className="label-wrap">
        <label>{label} {required && <span className="required">*</span>}</label>
        {error && <span>{errorText}</span>}
      </div>
      <InputS
        error={error}
        onChange={(e) => handleChange(e.target.value, idKey)}
        disabled={disabled}
        {...rest}
        label=""
        helperText=""
        variant="outlined"
      />
      <span className="helper-text">{helperText}</span>
    </InputWrap>
  );
};

export default Input;
