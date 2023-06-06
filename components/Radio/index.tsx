import { FormControlLabel } from "@mui/material";
import RadioMui from "@mui/material/Radio";
import { FC } from "react";
import { RadioS } from "./styled";

const Radio: FC<{
  data: any;
  handleChange: (value: string, idKey: string) => void;
  value: string;
  idKey: string;
}> = ({ data, handleChange, value, idKey, ...rest }) => {
  return (
    <RadioS
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={value}
      onChange={(e) => handleChange(e.target.value, idKey)}
      {...rest}
    >
      {data.map((item: any, idx: number) => (
        <FormControlLabel
          key={idx}
          value={item.label}
          control={<RadioMui />}
          label={item.label}
          checked={value === item.label}
          disabled={item.disabled}
        />
      ))}
    </RadioS>
  );
};

export default Radio;
