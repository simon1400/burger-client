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

  // FS7RG9
  // ZYBI9H

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    code: [
      {check: 0, value: ""},
    ],
    aggree: false,
    gdpr: false,
    marketing: false
  });

  const [selectBurgerShop, setSelectBurgerShop] = useState<string>("")

  const [error, setError] = useState<any>({});
  const [errorState, setErrorState] = useState(false)

  const handleChange = (value: string | boolean, key: string) => {
    const stateCopy: any = {...state}
    stateCopy[key] = value
    setState(stateCopy)
    setError({})
    setErrorState(false)
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
    stateCopy.code.push({check: 0, value: ""})
    setState(stateCopy)
  }

  const handleRemoveCode = (e: any) => {
    e.preventDefault()
    const stateCopy: any = {...state}
    stateCopy.code.pop()
    setState(stateCopy)
  }

  const handleSend = async () => {
    setLoading(true);

    const errState: any = { ...error };

    if(state.name.length < 4) {
      errState.name = true
    }
    if(state.email.length < 4){
      errState.email = true
    }
    if(state.phone.length < 4){
      errState.phone = true
    }
    if(!state.aggree){
      errState.aggree = true
    }
    if(!state.gdpr){
      errState.gdpr = true
    }
    if(!state.marketing){
      errState.marketing = true
    }
    if(!selectBurgerShop.length){
      errState.selectBurgerShop = true
    }

    setError(errState);
    if (Object.values(errState).indexOf(true) >= 0) {
      setLoading(false);
      setErrorState(true)
      return;
    }

    let filteredCodes: any = state.code.filter((code: any) => code.check > 0)

    var i = 0;
    while(i < filteredCodes.length) {
      if(filteredCodes[i].check > 0) {
        await axios
          .delete(`${APP_API}/api/codes/` + filteredCodes[i].check)
          .then(() => {
            i++;
          }).catch((err) => console.log("err delete code -- ", err));
      }else{
        i++;
      }
    }

    filteredCodes = filteredCodes.map((item: any) => ({
      code: item.value
    }))

    const dataToSend = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      codes: filteredCodes,
      shop: selectBurgerShop,
      festivaly: 38
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
    const stateCopy = {...state}
    if(value.length === 6) {
      const {data}: any = await getCode({ variables: { code: value } })
      if(data.codes.data.length){
        stateCopy.code[idx].check = data.codes.data[0].id
      }else{
        stateCopy.code[idx].check = -1
      }
    }else{
      stateCopy.code[idx].check = -1
    }
    setState(stateCopy)
  }

  return (
    <Page>
      <div style={{margin: '50px 0'}}>
        <Head data={"Hlasování"} />
        <Container maxWidth="md">
          <form style={{marginBottom: "20px"}}>
            <Input
              idKey={"name"}
              value={state.name}
              name={"name"}
              label={"Jméno a příjmení"}
              error={error.name}
              required
              handleChange={handleChange}
              errorText={"Vyplňte údaj"}
            />
            <Input
              idKey={"email"}
              value={state.email}
              name={"email"}
              label={"Email"}
              required
              error={error.email}
              handleChange={handleChange}
              errorText={"Vyplňte údaj"}
            />
            <Input
              idKey={"phone"}
              value={state.phone}
              name={"phone"}
              label={"Telefon"}
              error={error.phone}
              required
              handleChange={handleChange}
              errorText={"Vyplňte údaj"}
            />
            <Radio
              data={festivalBurgers}
              idKey={"Burgrárna pro kterou chcete hlasovat"}
              required
              errorText={"Vyplňte údaj"}
              error={error.selectBurgerShop}
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
                {code.check > 0 && <CheckIcon />}
                {code.check < 0 && <span>neplatný kód</span>}
              </CodeInput>
            })}
            <ControledCodesS>
              <PulusS onClick={() => handleAddCode()}>
                <PlusIcon />
                <span>přidat další kód</span>
              </PulusS>
              {state.code.length > 1 && <a onClick={(e: any) => handleRemoveCode(e)} href="/">smazat</a>}
            </ControledCodesS>
            <ControlCheckbox>
              <FormControlLabel
                onChange={() => handleChange(!state.aggree, 'aggree')}
                control={<Checkbox />}
                label={<div className="label-checkbox">
                  <p>souhlas s <a href="/obchidni">obchodními podmínkami</a></p>
                  {error.aggree && <span>Vyplňte údaj</span>}
                </div>}
              />
            </ControlCheckbox>
            <ControlCheckbox>
              <FormControlLabel
                onChange={() => handleChange(!state.gdpr, 'gdpr')}
                control={<Checkbox />}
                label={<div className="label-checkbox">
                  <p>souhlas s <a href="/obchidni">GDPR</a></p>
                  {error.gdpr && <span>Vyplňte údaj</span>}
                </div>}
              />
            </ControlCheckbox>
            <ControlCheckbox>
              <FormControlLabel
                onChange={() => handleChange(!state.marketing, 'marketing')}
                control={<Checkbox />}
                label={<div className="label-checkbox">
                  <p>souhlas s marketing účely</p>
                  {error.marketing && <span>Vyplňte údaj</span>}
                </div>}
              />
            </ControlCheckbox>
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
            <Button disabled={loading || success} onClick={() => handleSend()}>{"Hlasovat"}</Button>
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
            {/* {success && <SuccessLabel />} */}
            {errorState && <ErrorLabel />}
          </Box>
        </Container>
      </div>
    </Page>
  );
};

export default Votes;

const ControlCheckbox = styled.div(({theme}) => `
  .label-checkbox{
    span{
      display: block;
      margin-top: -20px;
      color: ${theme.palette.primary.main};
    }
  }
`)
const ControledCodesS = styled.div(({theme}) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  a{
    color: ${theme.palette.primary.main};
  }
`)


const CodeInput = styled.div(({theme}) => `
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
