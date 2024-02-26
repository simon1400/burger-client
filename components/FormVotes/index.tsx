import { Container } from "@mui/material";
import Input from "components/Input";
import Radio from "components/Radio";
import Select from "components/Select";
import { Dispatch, FC, SetStateAction } from "react";

const FormVotes: FC<{
  data: any;
  state: any;
  error: any;
  setState: Dispatch<SetStateAction<{ festivals: never[] }>>;
  setError: Dispatch<SetStateAction<{ }>>;
}> = ({ state, setState, data, error, setError }) => {

  const handleChangeInput = (value: string, key: string) => {
    setError({...error, [key]: false})
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
                  error={error[item.label]}
                  handleChange={handleChangeInput}
                  required={item.required}
                  helperText={item.helperText}
                  errorText={item.errorMessage}
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
          })}
      </form>
    </Container>
  );
};

export default FormVotes;
