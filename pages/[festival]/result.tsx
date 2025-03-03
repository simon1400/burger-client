/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable array-callback-return */
import type { NextPage } from 'next'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { useTranslations } from 'next-intl'
// eslint-disable-next-line import/order
import { useRouter } from 'next/router'
import { getAllVotes } from 'queries/votes'
import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { wrapper } from 'stores'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: getAllVotes,
    variables: {
      festivalSlug: ctx.params?.festival,
      locale: ctx.locale,
    },
  })

  return {
    props: {
      data: data.votes.data,
      votes: true,
      messages: (await import(`../../messages/${ctx.locale}.json`)).default,
    },
  }
})

const createData = (
  festival: string,
  shop: string,
  name: string,
  email: string,
  phone: string,
  codes: string,
  marketing: boolean,
  mailConfirm: boolean,
) => ({ festival, shop, name, email, phone, codes, marketing, mailConfirm })

const ResultVotes: NextPage<{ data?: any }> = ({ data }) => {
  const [hasPassword, setHasPassword] = useState(false)
  // const [hasPassword, setHasPassword] = useState(true)
  const [score, setScore] = useState([])

  const tResultData = useTranslations('resultData')
  const t = useTranslations('global')

  const router = useRouter()

  const onlyUnique = (value: string, index: number, array: any) => array.indexOf(value) === index

  const hadnelWinnerTable = (data: any) => {
    const arrName = data.map((item: any) => item.attributes.shop)
    const uniqueName = arrName.filter(onlyUnique)
    const filtered: any = []
    uniqueName.map((item: string, idx: number) => {
      filtered.push({ name: item, codes: 0, globalScore: 0, mailScore: 0 })
      for (let i = 0; i < data.length; i++) {
        if (item === data[i].attributes.shop) {
          filtered[idx].codes += data[i].attributes.codes.length
          if (data[i].attributes.codes.length) {
            filtered[idx].globalScore += 1
          }
          if (data[i].attributes.mailConfirm) {
            filtered[idx].mailScore += 1
          }
        }
      }
    })
    setScore(filtered.sort((a: any, b: any) => b.globalScore - a.globalScore))
  }

  useEffect(() => {
    if (!hasPassword) {
      const enteredFood = prompt('Please enter password:')
      if (enteredFood === 'f5342wegstse5t3') {
        setHasPassword(true)
      }
    }
  }, [])

  useEffect(() => {
    hadnelWinnerTable(data)
  }, [hasPassword])

  if (!hasPassword) {
    return null
  }

  const rows = [
    ...data.map((item: any) => {
      const dataLocal = item.attributes
      return createData(
        dataLocal.festivaly.data.attributes.title,
        dataLocal.shop,
        dataLocal.name,
        dataLocal.email,
        dataLocal.phone,
        [...dataLocal.codes.map((code: any) => code.code)].join(', '),
        dataLocal.marketing,
        dataLocal.mailConfirm,
      )
    }),
  ]

  const headersCSV = [
    { label: tResultData('shop'), key: 'shop' },
    { label: tResultData('name'), key: 'name' },
    { label: tResultData('email'), key: 'email' },
    { label: tResultData('phone'), key: 'phone' },
    { label: tResultData('codes'), key: 'codes' },
    { label: tResultData('marketing'), key: 'marketing' },
    { label: tResultData('mailConfirm'), key: 'mailConfirm' },
  ]

  const dataCSV = [
    ...rows.map((item: any) => ({
      shop: item.shop,
      name: item.name,
      email: item.email,
      phone: item.phone,
      codes: item.codes,
      marketing: item.marketing,
      mailConfirm: item.mailConfirm,
    })),
  ]

  return (
    <Page>
      {!!score.length && (
        <Container>
          <Typography variant={'h1'} style={{ marginBottom: 20, marginTop: 100 }}>
            {`${t('festival')}: `}
            {rows[0].festival}
          </Typography>
          <Typography variant={'h2'} style={{ marginBottom: 20, marginTop: 100 }}>
            {`${t('winnersTable')}\r`}
          </Typography>
          <TableContainer style={{ marginBottom: 100 }}>
            <Table sx={{ minWidth: 650 }} aria-label={'simple table'}>
              <TableHead>
                <TableRow>
                  <TableCell>{'#'}</TableCell>
                  <TableCell>{'Shop'}</TableCell>
                  <TableCell>{'Score'}</TableCell>
                  <TableCell>{'Global Score'}</TableCell>
                  <TableCell>{'Score confirm mail'}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {score.map((row: any, idx: number) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component={'th'} scope={'row'}>
                      {idx + 1}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <b>{row.codes}</b>
                    </TableCell>
                    <TableCell>
                      <b>{row.globalScore}</b>
                    </TableCell>
                    <TableCell>
                      <b>{row.mailScore}</b>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}

      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant={'h2'} style={{ marginBottom: 20 }}>
            {`${t('votingResults')}\r`}
          </Typography>
          <CSVLink
            className={'csv-link-c'}
            filename={`${router.query.festival}-results.csv`}
            data={dataCSV}
            headers={headersCSV}
          >
            {`${t('downloadsCSV')}\r`}
          </CSVLink>
        </div>
      </Container>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label={'simple table'}>
          <TableHead>
            <TableRow>
              <TableCell>{'Name'}</TableCell>
              <TableCell align={'right'}>{'Shop'}</TableCell>
              <TableCell align={'right'}>{'Email'}</TableCell>
              <TableCell align={'right'}>{'Phone'}</TableCell>
              <TableCell align={'right'}>{'Codes'}</TableCell>
              <TableCell align={'right'}>{'Marketing'}</TableCell>
              <TableCell align={'right'}>{'Confirm mail'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name + row.shop}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell align={'right'}>{row.shop}</TableCell>
                <TableCell align={'right'}>{row.email}</TableCell>
                <TableCell align={'right'}>{row.phone}</TableCell>
                <TableCell align={'right'}>{row.codes}</TableCell>
                <TableCell align={'right'}>{row.marketing ? t('yes') : t('no')}</TableCell>
                <TableCell align={'right'}>{row.mailConfirm ? t('yes') : t('no')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  )
}

export default ResultVotes
