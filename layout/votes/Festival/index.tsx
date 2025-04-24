import type { FC } from 'react'

import { useLazyQuery } from '@apollo/client'
import { Box, CircularProgress, Container, FormControlLabel } from '@mui/material'
import { green } from '@mui/material/colors'
import axios from 'axios'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import ErrorLabel from 'components/ErrorLabel'
import Head from 'components/Head'
import Input from 'components/Input'
import Radio from 'components/Radio'
import { sendEmail } from 'helpers/sendMail'
import Page from 'layout/Page'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import CheckIcon from 'public/img/check.svg'
import PlusIcon from 'public/img/plus.svg'
import { getCodeQuery } from 'queries/votes'
import { useEffect, useState } from 'react'

import { CodeInput, ControlCheckbox, ControledCodesS, PulusS } from './styles'

const APP_API = process.env.APP_API

const VotesFestival: FC<{ festivalBurgers: any; idFestival: number }> = ({
  festivalBurgers,
  idFestival,
}) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const tVotes = useTranslations('votes')

  const router = useRouter()

  const [getCode] = useLazyQuery(getCodeQuery)

  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    code: [{ check: 0, value: '' }],
  })

  const [aggreeCheck, setAggreeCheck] = useState<boolean>(false)
  const [gdprCheck, setGdprCheck] = useState<boolean>(false)
  const [marketingCheck, setMarketingCheck] = useState<boolean>(false)

  const [selectBurgerShop, setSelectBurgerShop] = useState<string>('')

  const [error, setError] = useState<any>({})
  const [errorState, setErrorState] = useState(false)

  const handleChange = (value: string | boolean, key: string) => {
    const stateCopy: any = { ...state }
    stateCopy[key] = value
    setState(stateCopy)
    setError({})
    setErrorState(false)
  }

  useEffect(() => {
    setError({})
    setErrorState(false)
  }, [aggreeCheck, gdprCheck])

  const handleChangeCode = (value: any, key: string) => {
    const stateCopy: any = { ...state }
    stateCopy.code[key].value = value.toUpperCase()
    setState(stateCopy)
  }

  const handleChangeRadio = (value: string, idKey: string) => {
    setSelectBurgerShop(value)
    setError({})
    setErrorState(false)
  }

  const handleAddCode = () => {
    const stateCopy: any = { ...state }
    stateCopy.code.push({ check: 0, value: '' })
    setState(stateCopy)
  }

  const handleRemoveCode = (e: any) => {
    e.preventDefault()
    const stateCopy: any = { ...state }
    stateCopy.code.pop()
    setState(stateCopy)
  }

  const handleSend = async () => {
    setLoading(true)

    const errState: any = { ...error }

    if (state.name.length < 4) {
      errState.name = true
    }
    if (state.email.length < 4) {
      errState.email = true
    }
    if (state.phone.length < 4) {
      errState.phone = true
    }
    if (!aggreeCheck) {
      errState.aggree = true
    }
    if (!gdprCheck) {
      errState.gdpr = true
    }
    if (!selectBurgerShop.length) {
      errState.selectBurgerShop = true
    }

    setError(errState)
    if (Object.values(errState).includes(true)) {
      setLoading(false)
      setErrorState(true)
      return
    }

    let filteredCodes: any = state.code.filter((code: any) => code.check > 0)

    let i = 0
    while (i < filteredCodes.length) {
      if (filteredCodes[i].check > 0) {
        await axios
          .delete(`${APP_API}/api/codes/${filteredCodes[i].check}?locale=${router.locale}`)
          .then(() => {
            i++
          })
          .catch((err) => console.log('err delete code -- ', err))
      } else {
        i++
      }
    }

    filteredCodes = filteredCodes.map((item: any) => ({
      code: item.value,
    }))

    const dataToSend = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      codes: filteredCodes,
      shop: selectBurgerShop,
      marketing: marketingCheck,
      festivaly: idFestival,
      mailConfirm: false,
      locale: router.locale,
    }
    // 0004HE

    await axios
      .post(`${APP_API}/api/votes`, { data: dataToSend })
      .then((res) => {
        setLoading(false)
        setSuccess(true)
        sendEmail({ ...dataToSend, id: res.data.data.id, locale: router.locale })
        router.push('/votes/dekujem')
      })
      .catch((err) => console.log('err save form -- ', err))
  }

  const handleOnBlur = async (value: string, idx: number) => {
    const stateCopy = { ...state }
    if (value.length === 6) {
      const { data }: any = await getCode({ variables: { code: value, locale: router.locale } })
      if (data.codes.data.length) {
        stateCopy.code[idx].check = data.codes.data[0].id
      } else {
        stateCopy.code[idx].check = -1
      }
    } else {
      stateCopy.code[idx].check = -1
    }
    setState(stateCopy)
  }
  return (
    <Page>
      <div style={{ margin: '40px 0 100px' }}>
        <Head text={tVotes('form.title')} type={'h1'} />
        <Container maxWidth={'md'}>
          <form style={{ marginBottom: '20px' }}>
            <Input
              idKey={'name'}
              value={state.name}
              name={'name'}
              label={tVotes('form.name')}
              error={error.name}
              required
              handleChange={handleChange}
              errorText={tVotes('form.requiredFields')}
            />
            <Input
              idKey={'email'}
              value={state.email}
              name={'email'}
              label={'Email'}
              required
              error={error.email}
              handleChange={handleChange}
              errorText={tVotes('form.requiredFields')}
            />
            <Input
              idKey={'phone'}
              value={state.phone}
              name={'phone'}
              label={'Telefon'}
              error={error.phone}
              required
              handleChange={handleChange}
              errorText={tVotes('form.requiredFields')}
            />
            <Radio
              data={festivalBurgers}
              idKey={tVotes('form.shop')}
              required
              errorText={tVotes('form.requiredFields')}
              error={error.selectBurgerShop}
              handleChange={handleChangeRadio}
              value={selectBurgerShop}
            />
            {state.code.map((code: any, idx: number) => {
              return (
                <CodeInput key={idx}>
                  <Input
                    idKey={`${idx}`}
                    value={code.value}
                    name={`code_${idx}`}
                    onBlur={(e: any) => handleOnBlur(e.target.value, idx)}
                    label={!idx ? tVotes('form.code') : ''}
                    handleChange={handleChangeCode}
                  />
                  {code.check > 0 && <CheckIcon />}
                  {code.check < 0 && <span>{tVotes('form.notValidCode')}</span>}
                </CodeInput>
              )
            })}
            <ControledCodesS>
              <PulusS onClick={() => handleAddCode()}>
                <PlusIcon />
                <span>{tVotes('form.addMoreCode')}</span>
              </PulusS>
              {state.code.length > 1 && (
                <a onClick={(e: any) => handleRemoveCode(e)} href={'/'}>
                  {tVotes('form.deleteCode')}
                </a>
              )}
            </ControledCodesS>
            <ControlCheckbox>
              <FormControlLabel
                onChange={() => setAggreeCheck(!aggreeCheck)}
                value={aggreeCheck}
                control={<Checkbox />}
                label={
                  <div className={'label-checkbox'}>
                    <p>
                      {tVotes('form.aggreeWith')}{' '}
                      <a href={'/clanek/obchodni-podminky'} target={'_blank'}>
                        {tVotes('form.terms')}
                      </a>
                    </p>
                    {error.aggree && <span>{tVotes('form.requiredFields')}</span>}
                  </div>
                }
              />
            </ControlCheckbox>
            <ControlCheckbox>
              <FormControlLabel
                onChange={() => setGdprCheck(!gdprCheck)}
                value={gdprCheck}
                control={<Checkbox />}
                label={
                  <div className={'label-checkbox'}>
                    <p>
                      {tVotes('form.aggreeWith')}{' '}
                      <a href={'/clanek/informace-o-zpracovani-osobnich-udaju'} target={'_blank'}>
                        {'GDPR\r'}
                      </a>
                    </p>
                    {error.gdpr && <span>{tVotes('form.requiredFields')}</span>}
                  </div>
                }
              />
            </ControlCheckbox>
            <ControlCheckbox>
              <FormControlLabel
                onChange={() => setMarketingCheck(!marketingCheck)}
                value={marketingCheck}
                control={<Checkbox />}
                label={
                  <div className={'label-checkbox'}>
                    <p>{tVotes('form.marketing')}</p>
                    {error.marketing && <span>{tVotes('form.requiredFields')}</span>}
                  </div>
                }
              />
            </ControlCheckbox>
          </form>
        </Container>
        <Container maxWidth={'md'}>
          <Box
            sx={{
              m: 1,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button disabled={loading || success} onClick={() => handleSend()}>
              {tVotes('form.vote')}
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
            {/* {success && <SuccessLabel />} */}
            {errorState && (
              <div style={{ textAlign: 'center' }}>
                <ErrorLabel content={tVotes('form.errorLabel')} />
              </div>
            )}
          </Box>
        </Container>
      </div>
    </Page>
  )
}

export default VotesFestival
