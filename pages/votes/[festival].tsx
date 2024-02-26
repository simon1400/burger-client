import { Box, CircularProgress, Container, FormControlLabel } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import BlockContent from "components/BlockContent";
import Button from "components/Button";
import ErrorLabel from "components/ErrorLabel";
import Form from "components/Form";
import Head from "components/Head";
import SuccessLabel from "components/SuccessLabel";
import PlusIcon from 'public/img/plus.svg'
import CheckIcon from 'public/img/check.svg'
import Page from "layout/Page";
import { client } from "lib/api";
import { NextPage } from "next";
import { festivalsQuery, getFestival } from "queries/festivals";
import { formPage } from "queries/form";
import { useEffect, useState } from "react";
import { wrapper } from "stores";
import { changeDescription, changeTitle } from "stores/slices/metaSlices";
import codes from 'helpers/codes.json'

import Input from "components/Input";
import Radio from "components/Radio";
import styled from "@emotion/styled";
import Select from "components/Select";
import Checkbox from "components/Checkbox";

const APP_API = process.env.APP_API;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: getFestival,
      variables: {
        slug: ctx.params?.festival
      }
    });

    const festivalLinup = data.festivals.data[0].attributes.lineup.data;
    const festivalBurgers: any = []

    festivalLinup.map((item: any) => {
      item.attributes.category.data.map((categoryItem: any) => {
        if(categoryItem.attributes.title === "Burgrárna"){
          festivalBurgers.push(item)
        }
      })
    })

    const transformFestivalBurgers = festivalBurgers.map((item: any) => ({
      label: item.attributes.title,
      disabled: false
    }))

    store.dispatch(changeTitle("Hlasovani"));
    store.dispatch(changeDescription("Hlasovani"));

    return {
      props: {
        festivalBurgers: transformFestivalBurgers
      },
    };
  }
);

const Registration: NextPage<{ festivalBurgers: any; }> = ({
  festivalBurgers
}) => {

  const [dataSend, setDataSend] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    code: [
      {check: -1, value: ""}
    ],
    aggree: false,
    gdpr: false,
    marketing: false
  });

  const [selectBurgerShop, setSelectBurgerShop] = useState<string>("")

  const [error, setError] = useState({});

  const [errorState, setErrorState] = useState(false)

  const handleSend = async () => {
    setLoading(true);

    const errState: any = { ...error };
    for (const [key, value] of Object.entries(errState)) {
      if (!dataSend[key].length) {
        errState[key] = true;
      }
    }

    setError(errState);
    if (Object.values(errState).indexOf(true) >= 0) {
      setLoading(false);
      setErrorState(true)
      return;
    }

    const sendObj: any = [];
    const keysData = Object.keys(dataSend);

    // await axios
    //   .post(`${APP_API}/api/applications`, { data: { result: sendObj } })
    //   .then(() => {
    //     setLoading(false);
    //     setSuccess(true);
    //     axios
    //       .post("/api/mail", sendObj)
    //       .then((res) => console.log(res))
    //       .catch((err) => console.log(err.response));
    //   })
    //   .catch((err) => console.log("err save form -- ", err));
  };

  const handleChange = (value: string | boolean, key: string) => {
    const stateCopy: any = {...state}
    stateCopy[key] = value
    setState(stateCopy)
  }

  const handleChangeCode = (value: any, key: string) => {
    const stateCopy: any = {...state}
    stateCopy.code[key].value = value
    stateCopy.code[key].check = codes.findIndex((el) => el === value)
    setState(stateCopy)
  }

  const handleChangeRadio = (value: string, idKey: string) => {
    setSelectBurgerShop(value)
  }

  const handleAddCode = () => {
    const stateCopy: any = {...state}
    stateCopy.code.push({check: -1, value: ""})
    setState(stateCopy)
  }

  return (
    <Page>
      <Head data={"Hlasovani"} />
      <BlockContent content={"Zajimavy popis"} />
      <Container maxWidth="md">
        <form style={{marginBottom: "20px"}}>
          <Input
            idKey={"name"}
            value={state.name}
            name={"name"}
            label={"Jméno a příjmení"}
            error={false}
            handleChange={handleChange}
            required={true}
            errorText={"Chyba"}
          />
          <Input
            idKey={"email"}
            value={state.email}
            name={"email"}
            label={"Email"}
            error={false}
            handleChange={handleChange}
            required={true}
            errorText={"Chyba"}
          />
          <Input
            idKey={"phone"}
            value={state.phone}
            name={"phone"}
            label={"Telefon"}
            error={false}
            handleChange={handleChange}
            required={true}
            errorText={"Chyba"}
          />
          <Radio
            data={festivalBurgers}
            idKey={"Burgrárna pro kterou chcete hlasovat"}
            handleChange={handleChangeRadio}
            value={selectBurgerShop}
          />
          {state.code.map((code: any, idx: number) => {
            return <CodeInput>
              <Input
                idKey={`${idx}`}
                value={code.value}
                name={"code_"+idx}
                label={!idx ? "Kód z hlasovacího lístku" : ""}
                handleChange={handleChangeCode}
              />
              {code.check > -1 && <CheckIcon />}
            </CodeInput>
          })}
          <PulusS onClick={() => handleAddCode()}>
            <PlusIcon />
            <span>přidat další kód</span>
          </PulusS>
          <div>
            <FormControlLabel
              onClick={() => handleChange(!state.aggree, 'aggree')}
              control={<Checkbox />}
              label={<p>souhlas s <a href="/obchidni">obchodními podmínkami</a></p>}
            />
          </div>
          <div>
            <FormControlLabel
              onClick={() => handleChange(!state.gdpr, 'gdpr')}
              control={<Checkbox />}
              label={<p>souhlas s <a href="/obchidni">GDPR</a></p>}
            />
          </div>
          <div>
            <FormControlLabel
              onClick={() => handleChange(!state.marketing, 'marketing')}
              control={<Checkbox />}
              label={<p>souhlas s marketing účely</p>}
            />
          </div>
        </form>
      </Container>
      <Container maxWidth="md">
        <Box
          sx={{
            m: 1,
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Button disabled={loading || success} onClick={() => handleSend()}>
            {"Hlasovat"}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
          {success && <SuccessLabel />}
          {errorState && <ErrorLabel />}
        </Box>
      </Container>
    </Page>
  );
};

export default Registration;

const CodeInput = styled.div`
  position: relative;
  svg{
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
`

const PulusS = styled.div`
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
