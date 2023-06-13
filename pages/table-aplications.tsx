import Page from "layout/Page"
import { NextPage } from "next"
import { wrapper } from "stores"
import { client } from "lib/api"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Head from "components/Head"
import styled from "@emotion/styled"
import { aplicationsQuery } from "queries/aplications"
import { useEffect, useState } from "react"

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: aplicationsQuery,
    });

    const applications = data.applications.data.map((item: any) => item.attributes.result);

    const resultKey: any = []
    applications.map((item: any) => {
      item.map((itemResult: any) => {
        if(resultKey.indexOf(itemResult.key) < 0) {
          resultKey.push(itemResult.key)
        } 
      })
    })

    const result: any = []

    applications.map((item: any) => {
      const obj: any = {}
      resultKey.map((key: string) => {
        obj[key] = item.find((itemFind: any) => itemFind.key === key)?.value || ""
      })
      result.push(obj)
    })

    store.dispatch(changeTitle('Result page'))
    store.dispatch(changeDescription('Result page'))

    

    return {
      props: {
        result
      }
    };
  }
);

const GaleryPage: NextPage<{result: any}> = ({
  result,
}) => {

  const [hasPassword, setHasPassword] = useState(false)
  

  useEffect(() => {
    if(!hasPassword) {
      const enteredFood = prompt('Please enter password:')
      if(enteredFood === "admin") {
        setHasPassword(true)
      }
    }
  }, [])

  if(!hasPassword) {
    return null
  }

  return (
    <Page>
      <Container>
        <Head data="Data result table" />
        <TableWrap>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {Object.keys(result[0]).map((item: string, idx: number) => <TableCell align={!idx ? "left" : "right"}>{item}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row: any, idx: number) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.values(row).map((rowItem: any, idxRow: number) => <TableCell key={idxRow} align={!idxRow ? "left" : "right"} scope="row">
                    <div dangerouslySetInnerHTML={{__html: rowItem.replace(/,/g, "<br/>")}} />
                  </TableCell>)}
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


const TableWrap = styled(TableContainer)(({theme}) => `
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
`)