import { Box, CircularProgress, Container, FormControlLabel } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import Button from "components/Button";
import ErrorLabel from "components/ErrorLabel";
import Head from "components/Head";
import SuccessLabel from "components/SuccessLabel";
import PlusIcon from 'public/img/plus.svg'
import CheckIcon from 'public/img/check.svg'
import Page from "layout/Page";
import { client } from "lib/api";
import { NextPage } from "next";
import { getFestival } from "queries/festivals";
import { useState } from "react";
import { wrapper } from "stores";
import { changeDescription, changeTitle } from "stores/slices/metaSlices";
import codes from 'helpers/codes.json'

import Input from "components/Input";
import Radio from "components/Radio";
import styled from "@emotion/styled";
import Checkbox from "components/Checkbox";
import { useLazyQuery } from "@apollo/client";
import { getCodeQuery } from "queries/votes";
import { useRouter } from "next/router";

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

    const codesNew: any = codes
    var i = 477661;
    while(i < codesNew.length) {
      await axios
        .post(`${APP_API}/api/codes`, { data: {code: codesNew[i]} })
        .then(() => {
          console.log('Success -- ', i, ' -- ', codesNew[i])
          i++;
        }).catch((err) => console.log("err save form -- ", err));
    }

    store.dispatch(changeTitle("Hlasovani"));
    store.dispatch(changeDescription("Hlasovani"));

    return {
      props: {
        festivalBurgers: transformFestivalBurgers,
        votes: true
      },
    };
  }
);

const Votes: NextPage<{ festivalBurgers: any; }> = ({
  festivalBurgers
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter()

  const [getCode] = useLazyQuery(getCodeQuery);

  const [state, setState] = useState({
    name: "Dmytro Pechunka",
    email: "dmytro@pechunka.com",
    phone: "774048983",
    code: [
      {check: 0, value: "FS7RG9"},
      {check: 2, value: "ZYBI9H"},
    ],
    aggree: true,
    gdpr: true,
    marketing: true
  });

  const [selectBurgerShop, setSelectBurgerShop] = useState<string>("JJ Grill Bill")

  const [errorState, setErrorState] = useState(false)

  const handleChange = (value: string | boolean, key: string) => {
    const stateCopy: any = {...state}
    stateCopy[key] = value
    setState(stateCopy)
  }

  const handleChangeCode = (value: any, key: string) => {
    const stateCopy: any = {...state}
    stateCopy.code[key].value = value
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

  const handleSend = async () => {
    setLoading(true);

    const dataToSend = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      codes: state.code.map((code: any) => ({code: code.value})),
      shop: selectBurgerShop,
      festivaly: 38
    }

    var i = 0;
    while(i < state.code.length) {
      await axios
        .delete(`${APP_API}/api/codes/` + state.code[i].check)
        .then(() => {
          i++;
        }).catch((err) => console.log("err delete code -- ", err));
    }

    await axios
      .post(`${APP_API}/api/votes`, { data: dataToSend })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        router.push('/votes/dekujem')
      }).catch((err) => console.log("err save form -- ", err));
  };

  const handleOnBlur = async (value: string, idx: number) => {
    if(value.length === 6) {
      const data: any = await getCode({ variables: { code: value } })
      console.log(data)
      if(data.codes.data.length){
        const stateCopy = {...state}
        stateCopy.code[idx].check = data.codes.data[0].id
        setState(stateCopy)
      }
    }
  }

  return (
    <Page>
      <Head data={"Hlasování"} />
      <Container maxWidth="md">
        <form style={{marginBottom: "20px"}}>
          <Input
            idKey={"name"}
            value={state.name}
            name={"name"}
            label={"Jméno a příjmení"}
            error={false}
            handleChange={handleChange}
            errorText={"Chyba"}
          />
          <Input
            idKey={"email"}
            value={state.email}
            name={"email"}
            label={"Email"}
            error={false}
            handleChange={handleChange}
            errorText={"Chyba"}
          />
          <Input
            idKey={"phone"}
            value={state.phone}
            name={"phone"}
            label={"Telefon"}
            error={false}
            handleChange={handleChange}
            errorText={"Chyba"}
          />
          <Radio
            data={festivalBurgers}
            idKey={"Burgrárna pro kterou chcete hlasovat"}
            handleChange={handleChangeRadio}
            value={selectBurgerShop}
          />
          {state.code.map((code: any, idx: number) => {
            return <CodeInput key={idx}>
              <Input
                idKey={`${idx}`}
                value={code.value}
                name={"code_"+idx}
                onBlur={(e: any) => handleOnBlur(e.target.value, idx)}
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

export default Votes;

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
