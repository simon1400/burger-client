import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Page from "layout/Page";
import { client } from "lib/api";
import { NextPage } from "next"
import { getAllVotes } from "queries/votes";
import { useEffect, useState } from "react";

export const getServerSideProps = (async () => {
  const { data } = await client.query({
    query: getAllVotes
  });

  return { 
    props: { 
      data: data.votes.data,
      votes: true
    } 
}
})

const createData = (
  festival: string,
  shop: string,
  name: string,
  email: string,
  phone: string,
  codes: string,
) => ({ festival, shop, name, email, phone, codes })

const ResultVotes: NextPage<{data?: any}> = ({data}) => {

  const [hasPassword, setHasPassword] = useState(false)
  

  useEffect(() => {
    if(!hasPassword) {
      const enteredFood = prompt('Please enter password:')
      if(enteredFood === "f5342wegstse5t3") {
        setHasPassword(true)
      }
    }
  }, [])

  if(!hasPassword) {
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
        [...dataLocal.codes.map((code: any) => code.code)].join(',')
      )
    })
  ];

  return (
    <Page>
      <Container>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Festival</TableCell>
                <TableCell align="right">Shop</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Codes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.festival}
                  </TableCell>
                  <TableCell align="right">{row.shop}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.codes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  )
}

export default ResultVotes