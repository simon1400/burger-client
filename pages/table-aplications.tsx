/* eslint-disable sonarjs/no-nested-functions */
/* eslint-disable array-callback-return */
/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { NextPage } from 'next'

import styled from '@emotion/styled'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Head from 'components/Head'
import Page from 'layout/Page'
import { client } from 'lib/api'
import { aplicationsQuery } from 'queries/aplications'
import { useEffect, useState } from 'react'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await client.query({
    query: aplicationsQuery,
    variables: {
      locale: ctx.locale,
    },
  })

  const applications = data.applications.data.map((item: any) => item.attributes.result)

  const resultKey: any = []
  applications.map((item: any) => {
    item.map((itemResult: any) => {
      if (!resultKey.includes(itemResult.key)) {
        resultKey.push(itemResult.key)
      }
    })
  })

  const result: any = []

  applications.map((item: any) => {
    const obj: any = {}
    resultKey.map((key: string) => {
      obj[key] = item.find((itemFind: any) => itemFind.key === key)?.value || ''
    })
    result.push(obj)
  })

  store.dispatch(changeTitle('Result page'))
  store.dispatch(changeDescription('Result page'))

  return {
    props: {
      result,
      messages: (await import(`../messages/${ctx.locale}.json`)).default,
    },
  }
})

const TableWrap = styled(TableContainer)(
  ({ theme }) => `
  background: transparent;
  th{
    font-weight: 800;
    font-size: 23px;
    white-space: nowrap;
  }
  th, td{
    &:first-of-type{
      min-width: 500px;
    }
  }
`,
)

const GaleryPage: NextPage<{ result: any }> = ({ result }) => {
  const [hasPassword, setHasPassword] = useState(false)

  useEffect(() => {
    if (!hasPassword) {
      // eslint-disable-next-line no-alert
      const enteredFood = prompt('Please enter password:')
      if (enteredFood === 'admin') {
        setHasPassword(true)
      }
    }
  }, [])

  if (!hasPassword) {
    return null
  }

  return (
    <Page>
      <Container>
        <Head data={'Data result table'} />
        <TableWrap>
          <Table sx={{ minWidth: 650 }} size={'small'} aria-label={'a dense table'}>
            <TableHead>
              <TableRow>
                {Object.keys(result[0]).map((item: string, idx: number) => (
                  <TableCell key={item} align={!idx ? 'left' : 'right'}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row: any, idx: number) => (
                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {Object.values(row).map((rowItem: any, idxRow: number) => (
                    <TableCell key={rowItem} align={!idxRow ? 'left' : 'right'} scope={'row'}>
                      <div dangerouslySetInnerHTML={{ __html: rowItem.replace(/,/g, '<br/>') }} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </Container>
    </Page>
  )
}

export default GaleryPage
