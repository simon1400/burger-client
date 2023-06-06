import { Container } from "@mui/material";
import axios from "axios";
import BlockContent from "components/BlockContent";
import Button from "components/Button";
import Form from "components/Form";
import Head from "components/Head";
import Lineup from "components/Lineup";
import { filterEvents } from "helpers/filterEvents";
import { sortDate } from "helpers/sortDate";
import Page from "layout/Page";
import { client } from "lib/api";
import { NextPage } from "next";
import { festivalsQuery } from "queries/festivals";
import formQuery from "queries/form";
import homepageQuery from "queries/homepage";
import { useEffect, useState } from "react";
import { wrapper } from "stores";
import { changeDescription, changeTitle } from "stores/slices/metaSlices";

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: homepageQuery,
    });

    const { data: festivalsData } = await client.query({
      query: festivalsQuery,
    });

    const { data: formsData } = await client.query({
      query: formQuery,
    });

    const homepage = data.homepage.data.attributes;
    const form = formsData.form.data.attributes;
    const festivals = festivalsData.festivals.data.map(
      (item: any) => item.attributes
    );

    store.dispatch(changeTitle(homepage.meta?.title || "Registrace"));
    store.dispatch(
      changeDescription(homepage.meta?.description || "Registrace")
    );

    return {
      props: {
        homepage,
        festivals: filterEvents(sortDate(festivals)),
        form,
      },
    };
  }
);

const Registration: NextPage<{ festivals: any; form: any }> = ({
  festivals,
  form,
}) => {
  const [dataSend, setDataSend] = useState({});

  useEffect(() => {
    const formObj = {};
    form.fields.map((item: any) => {
      if (item.__typename === "ComponentFormSelect") {
        // @ts-ignore
        formObj[item.key] = [];
      } else {
        // @ts-ignore
        formObj[item.key] = "";
      }
    });
    setDataSend({ festivals: [], ...formObj });
  }, [form]);

  const handleChangeFestivals = (arrFestivals: any) => {
    setDataSend({ ...dataSend, festivals: arrFestivals });
  }

  const handleSend = async () => {
    const sendObj: any = []
    const keysData = Object.keys(dataSend)
    for(let i = 0; i < keysData.length; i++) {
      // @ts-ignore
      if(dataSend[keysData[i]] instanceof File) {
        let formData = new FormData();
        // @ts-ignore
        formData.append("files", dataSend[keysData[i]]);
        const uploudImg = await axios.post(`${APP_API}/api/upload`, formData).catch(err => console.log('err uploud image -- ', err))
        sendObj.push({
          // @ts-ignore
          key: keysData[i],
          // @ts-ignore
          value: `${APP_API}${uploudImg.data[0].url}`
        })
      }else{
        sendObj.push({
          // @ts-ignore
          key: keysData[i],
          // @ts-ignore
          value: `${dataSend[keysData[i]]}`
        })
      }
    }
    await axios.post(`${APP_API}/api/applications`, {data: {result: sendObj}}).then(res => {
      console.log('res - ', res.data)
    }).catch(err => console.log('err save form -- ', err))
  }

  return (
    <Page>
      <Head data="Přihláška na festival" />
      <BlockContent content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Aliquam id dolor. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam" />
      <Lineup head="" data={festivals.future} handleChange={handleChangeFestivals} registration />
      {form.fields.length && (
        <Form data={form} state={dataSend} setState={setDataSend} />
      )}
      <Container maxWidth="md"><Button onClick={() => handleSend()}>odeslat žádost</Button></Container>
    </Page>
  );
};

export default Registration;