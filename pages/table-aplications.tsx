/* eslint-disable sonarjs/no-nested-functions */
/* eslint-disable array-callback-return */

import type { NextPage } from 'next'

import styled from '@emotion/styled'
import {
  Box,
  Button,
  CircularProgress,
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
import { getClient } from 'lib/api'
import { useRouter } from 'next/router'
import { aplicationsQuery } from 'queries/aplications'
import { useEffect, useState } from 'react'
import { wrapper } from 'stores'
import { changeDescription, changeTitle } from 'stores/slices/metaSlices'

type ExportResult = 'ok' | 'empty' | 'error'

const EXPORT_MESSAGES: Record<ExportResult, (count: number) => string> = {
  ok: (count) => `Successfully exported ${count} records`,
  empty: () => 'No records to export',
  error: () => 'Export failed. Check console for details.',
}

// Данные из публичной формы: значение, начинающееся с = + - @ TAB CR, Excel выполнит как формулу
// (CSV injection) — префиксуем апострофом. Кавычки удваиваем, ячейку оборачиваем в кавычки.
const csvCell = (raw: unknown) => {
  const value = (raw ?? '').toString()
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${safe.replace(/"/g, '""')}"`
}

function exportApplicationsToCSV(data: any[], filename: string): ExportResult {
  if (!data.length) {
    return 'empty'
  }

  try {
    const keys = Object.keys(data[0])

    // Обрабатываем данные порциями для лучшей производительности
    const CHUNK_SIZE = 100
    const csvRows: string[] = []

    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      const chunk = data.slice(i, i + CHUNK_SIZE)
      const chunkRows = chunk.map((row) => {
        const rowCopy: any = { ...row }

        // Преобразуем массив festivals (если он строка с запятыми)
        if (typeof rowCopy.festivals === 'string') {
          rowCopy.festivals = rowCopy.festivals.split(',').join(' | ')
        }

        return keys.map((k) => csvCell(rowCopy[k])).join(';')
      })
      csvRows.push(...chunkRows)
    }

    // Чешский и польский Excel ждут `;` и CRLF — с запятой всё слипается в одну колонку
    const csvHeader = keys.map(csvCell).join(';')
    const csvContent = [csvHeader, ...csvRows].join('\r\n')

    // Добавляем BOM для корректного отображения UTF-8 в Excel
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Освобождаем память
    URL.revokeObjectURL(url)

    return 'ok'
  } catch (error) {
    console.error('Error exporting CSV:', error)
    return 'error'
  }
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { data } = await getClient().query({
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
      result: result.slice(0, 100),
      fullResult: result,
      messages: (await import(`../messages/${ctx.locale}.json`)).default,
    },
  }
})

const TableWrap = styled(TableContainer)`
  background: transparent;
  th {
    font-weight: 800;
    font-size: 23px;
    white-space: nowrap;
  }
  th,
  td {
    &:first-of-type {
      min-width: 500px;
    }
  }
`

const GaleryPage: NextPage<{ result: any; fullResult: any }> = ({ result, fullResult }) => {
  const [hasPassword, setHasPassword] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportMessage, setExportMessage] = useState('')
  const { locale } = useRouter()

  useEffect(() => {
    if (!hasPassword) {
      // eslint-disable-next-line no-alert
      const enteredFood = prompt('Please enter password:')
      if (enteredFood === 'HCD9T-2LpkU-fVAYU-P2JBQ') {
        setHasPassword(true)
      }
    }
  }, [hasPassword])

  const handleExport = async () => {
    setIsExporting(true)
    setExportMessage('Preparing export...')

    // Небольшая задержка для отображения UI
    await new Promise((resolve) => setTimeout(resolve, 100))

    // локаль `en` — чешский сайт burgerstreetfestival.cz, `pl` — burgerfestival.pl
    const site = locale === 'pl' ? 'pl' : 'cz'
    const date = new Date().toISOString().split('T')[0]
    const status = exportApplicationsToCSV(fullResult, `prihlasky_${site}_${date}.csv`)
    setExportMessage(EXPORT_MESSAGES[status](fullResult.length))

    setIsExporting(false)

    // Очищаем сообщение через 3 секунды
    setTimeout(() => setExportMessage(''), 3000)
  }

  if (!hasPassword) {
    return null
  }

  return (
    <Page>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Head text={'Data result table'} type={'h1'} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {exportMessage && (
              <Box
                sx={{
                  color: exportMessage.includes('Successfully') ? 'success.main' : 'error.main',
                  fontSize: '14px',
                }}
              >
                {exportMessage}
              </Box>
            )}
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={handleExport}
              disabled={isExporting}
              startIcon={isExporting ? <CircularProgress size={20} /> : null}
            >
              {isExporting ? 'Exporting...' : `Export All (${fullResult.length} records)`}
            </Button>
          </Box>
        </Box>
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
                <TableRow
                  key={`row${idx}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.values(row).map((rowItem: any, idxRow: number) => (
                    <TableCell
                      key={rowItem + idxRow}
                      align={!idxRow ? 'left' : 'right'}
                      scope={'row'}
                    >
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
