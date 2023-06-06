import Checkbox from "components/Checkbox";
import { SelectS } from "./styled";
import { FC, useEffect, useState } from "react";
import { FormControlLabel } from "@mui/material";

const Select: FC<{
  data: any;
  idKey: string;
  handleChange: (value: string, idKey: string) => void;
}> = ({ data, idKey, handleChange }) => {

  return (
    <SelectS>
      {data.map((item: any, idx: number) => (
        <FormControlLabel
          key={idx}
          onClick={() => handleChange(item.label, idKey)}
          control={<Checkbox />}
          label={item.label}
        />
      ))}
    </SelectS>
  );
};

export default Select;