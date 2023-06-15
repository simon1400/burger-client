import { Box, CircularProgress, Container } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import BlockContent from "components/BlockContent";
import Button from "components/Button";
import Form from "components/Form";
import Head from "components/Head";
import Lineup from "components/Lineup";
import SuccessLabel from "components/SuccessLabel";
import { filterEvents } from "helpers/filterEvents";
import { sortDate } from "helpers/sortDate";
import Page from "layout/Page";
import { client } from "lib/api";
import { NextPage } from "next";
import { festivalsQuery } from "queries/festivals";
import formQuery, { formPage } from "queries/form";
import { useEffect, useState } from "react";
import { wrapper } from "stores";
import { changeDescription, changeTitle } from "stores/slices/metaSlices";

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: formPage,
    });

    const { data: festivalsData } = await client.query({
      query: festivalsQuery,
    });

    const { data: formsData } = await client.query({
      query: formQuery,
    });

    const page = data.applicationPage.data.attributes;
    const form = formsData.form.data.attributes;
    const festivals = festivalsData.festivals.data.map(
      (item: any) => item.attributes
    );

    store.dispatch(changeTitle(page.meta?.title || page.title));
    store.dispatch(
      changeDescription(page.meta?.description || "Registrace")
    );

    return {
      props: {
        page,
        festivals: filterEvents(sortDate(festivals)),
        form,
      },
    };
  }
);

const Registration: NextPage<{ page: any; festivals: any; form: any }> = ({
  festivals,
  form,
  page
}) => {
  const [dataSend, setDataSend] = useState<any>({});
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [error, setError] = useState({})

  useEffect(() => {
    const formObj = {};
    const err: any = {}
    form.fields.map((item: any) => {
      if(item.required) {
        err[item.label] = false
      }
      if (item.__typename === "ComponentFormSelect") {
        // @ts-ignore
        formObj[item.label] = [];
      } else {
        // @ts-ignore
        formObj[item.label] = "";
      }
    });
    setDataSend({ festivals: [], ...formObj });
    setError(err);
  }, [form]);

  const handleChangeFestivals = (arrFestivals: any) => {
    setDataSend({ ...dataSend, festivals: arrFestivals });
  }

  const handleSend = async () => {
    setLoading(true)

    const errState: any = {...error}
    for (const [key, value] of Object.entries(errState)) {
      if(!dataSend[key].length) {
        errState[key] = true
      }
    }

    setError(errState)
    if(Object.values(errState).indexOf(true) >= 0){
      setLoading(false)
      return
    }

    const sendObj: any = []
    const keysData = Object.keys(dataSend)
    for(let i = 0; i < keysData.length; i++) {
      if(dataSend[keysData[i]] instanceof File) {
        let formData = new FormData();
        formData.append("files", dataSend[keysData[i]]);
        const uploudImg = await axios.post(`${APP_API}/api/upload`, formData).catch(err => console.log('err uploud image -- ', err))
        sendObj.push({
          key: keysData[i],
          // @ts-ignore
          value: `${APP_API}${uploudImg.data[0].url}`
        })
      }else{
        sendObj.push({
          key: keysData[i],
          value: `${dataSend[keysData[i]]}`
        })
      }
    }
    await axios.post(`${APP_API}/api/applications`, {data: {result: sendObj}}).then(res => {
      setLoading(false)
      setSuccess(true)
    }).catch(err => console.log('err save form -- ', err))
  }

  return (
    <Page>
      <Head data={page.title} />
      <BlockContent content={page.content} />
      <Lineup head="" data={festivals.future} handleChange={handleChangeFestivals} registration />
      {form.fields.length && (
        <Form data={form} state={dataSend} setState={setDataSend} error={error} setError={setError} />
      )}
      <Container maxWidth="md">
        <Box sx={{ m: 1, position: 'relative', display: "inline-flex", alignItems: "center" }}>
          <Button disabled={loading || success} onClick={() => handleSend()}>odeslat žádost</Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
          {success && <SuccessLabel />}
        </Box>
      </Container>
      <BlockContent content={page.content2} />
    </Page>
  );
};

export default Registration;
