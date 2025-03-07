/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable ts/ban-ts-comment */
import type { NextPage } from 'next'

import { Box, CircularProgress, Container } from '@mui/material'
import { green } from '@mui/material/colors'
import axios from 'axios'
import BlockContent from 'components/BlockContent'
import Button from 'components/Button'
import ErrorLabel from 'components/ErrorLabel'
import Form from 'components/Form'
import Head from 'components/Head'
import Lineup from 'components/Lineup'
import SuccessLabel from 'components/SuccessLabel'
import { filterEvents } from 'helpers/filterEvents'
import { sortDate } from 'helpers/sortDate'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { festivalsQuery } from 'queries/festivals'
import formQuery, { formPage } from 'queries/form'
import { useEffect, useState } from 'react'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

const APP_API = process.env.APP_API

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: formPage,
    variables: {
      locale: ctx.locale,
    },
  })

  const { data: festivalsData } = await client.query({
    query: festivalsQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const { data: formsData } = await client.query({
    query: formQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const page = data.applicationPage.data.attributes
  const form = formsData.form.data.attributes
  const festivals = festivalsData.festivals.data.map((item: any) => item.attributes)

  store.dispatch(changeTitle(page.meta?.title || page.title))
  store.dispatch(changeDescription(page.meta?.description || 'Registrace'))

  return {
    props: {
      page,
      festivals: filterEvents(sortDate(festivals)),
      form,
      messages: (await import(`../messages/${ctx.locale}.json`)).default,
    },
  }
})

const Registration: NextPage<{ page: any; festivals: any; form: any }> = ({
  festivals,
  form,
  page,
}) => {
  const [dataSend, setDataSend] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [error, setError] = useState({})

  const [errorState, setErrorState] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const formObj = {}
    const err: any = {
      festivals: false,
    }
    form.fields.map((item: any) => {
      if (item.required) {
        err[item.label] = false
      }
      if (item.__typename === 'ComponentFormSelect') {
        // @ts-ignore
        formObj[item.label] = []
      } else {
        // @ts-ignore
        formObj[item.label] = ''
      }
    })
    setDataSend({ festivals: [], ...formObj })
    setError(err)
  }, [form])

  useEffect(() => {
    const errState: any = { ...error }
    for (const [key] of Object.entries(errState)) {
      if (!dataSend[key].length) {
        errState[key] = true
      }
    }
    if (!Object.values(errState).includes(true)) {
      setErrorState(false)
    }
  }, [error])

  const handleChangeFestivals = (arrFestivals: any) => {
    setErrorState(false)
    setDataSend({ ...dataSend, festivals: arrFestivals })
  }

  const handleSend = async () => {
    setLoading(true)

    const errState: any = { ...error }
    for (const [key] of Object.entries(errState)) {
      if (!dataSend[key].length) {
        errState[key] = true
      }
    }

    setError(errState)
    if (Object.values(errState).includes(true)) {
      setLoading(false)
      setErrorState(true)
      return
    }

    const sendObj: any = []
    const keysData = Object.keys(dataSend)
    for (let i = 0; i < keysData.length; i++) {
      if (dataSend[keysData[i]] instanceof File) {
        const formData = new FormData()
        formData.append('files', dataSend[keysData[i]])
        const uploudImg = await axios
          .post(`${APP_API}/api/upload`, formData)
          .catch((err) => console.log('err uploud image -- ', err))
        sendObj.push({
          key: keysData[i],
          // @ts-ignore
          value: `${APP_API}${uploudImg.data[0].url}`,
        })
      } else {
        sendObj.push({
          key: keysData[i],
          value: `${dataSend[keysData[i]]}`,
        })
      }
    }

    await axios
      .post(`${APP_API}/api/applications`, { data: { result: sendObj, locale: router.locale } })
      .then(() => {
        setLoading(false)
        setSuccess(true)
        axios
          .post('/api/mailRegistration', { data: [...sendObj], locale: router.locale })
          .then((res) => console.log(res))
          .catch((err) => console.log(err.response))
      })
      .catch((err) => console.log('err save form -- ', err))
  }

  const t = useTranslations('global')

  return (
    <Page>
      <Head data={page.title} />
      <BlockContent content={page.content} />
      <Lineup head={''} data={festivals.future} handleChange={handleChangeFestivals} registration />
      {form.fields.length && (
        <Form
          data={form}
          state={dataSend}
          setState={setDataSend}
          error={error}
          setError={setError}
        />
      )}
      <Container maxWidth={'md'}>
        <Box
          sx={{
            m: 1,
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Button disabled={loading || success} onClick={() => handleSend()}>
            {t('sendRequest')}
          </Button>
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
          {errorState && <ErrorLabel content={t('allRequiredFileds')} />}
        </Box>
      </Container>
      <BlockContent content={page.content2} />
    </Page>
  )
}

export default Registration
