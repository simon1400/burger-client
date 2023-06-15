import { Container } from "@mui/material";
import DropZone from "components/DropZone";
import Input from "components/Input";
import Radio from "components/Radio";
import Select from "components/Select";
import { Dispatch, FC, SetStateAction } from "react";

const Form: FC<{
  data: any;
  state: any;
  setState: Dispatch<SetStateAction<{ festivals: never[] }>>;
}> = ({ state, setState, data }) => {
  const handleChangeInput = (value: string, key: string) => {
    setState({ ...state, [key]: value });
  };

  const handleChangeSelect = (value: string, key: string) => {
    let checkArr = state[key];
    const hasIndex = checkArr.findIndex((item: any) => item === value);
    if (hasIndex >= 0) {
      checkArr = checkArr.splice(hasIndex, 1);
    } else {
      checkArr.push(value);
    }
    setState({ ...state, [key]: checkArr });
  };

  const handleChangeRadio = (value: string, key: string) => {
    setState({ ...state, [key]: value });
  };

  const handleUploudFile = (file: File, key: string) => {
    setState({ ...state, [key]: file });
  };

  return (
    <Container maxWidth="md">
      <form>
        {state &&
          data.fields.map((item: any, idx: number) => {
            if (item.__typename === "ComponentFormTetxField")
              return (
                <Input
                  key={idx}
                  idKey={item.label}
                  value={state[item.label]}
                  name={item.label}
                  label={item.label}
                  handleChange={handleChangeInput}
                  helperText={item.helperText}
                  errorText={item.errorText}
                  placeholder={item.placeholder}
                />
              );
            if (item.__typename === "ComponentFormSelect")
              return (
                <Select
                  key={idx}
                  data={item.item}
                  idKey={item.label}
                  handleChange={handleChangeSelect}
                />
              );
            if (item.__typename === "ComponentFormRadio")
              return (
                <Radio
                  key={idx}
                  data={item.item}
                  idKey={item.label}
                  handleChange={handleChangeRadio}
                  value={state[item.label]}
                />
              );
            if (item.__typename === "ComponentFormUploud")
              return (
                <DropZone
                  key={idx}
                  idKey={item.label}
                  state={state}
                  handleChange={handleUploudFile}
                />
              );
          })}
      </form>
    </Container>
  );
};

export default Form;
