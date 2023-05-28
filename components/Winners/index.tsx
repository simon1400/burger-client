import { Container, Grid } from "@mui/material"
import Winner from "components/Winner"
import { WinnersS } from "./styled"

const Winners = () => {
  return (
    <WinnersS>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={4}>
            <Winner />
          </Grid>
          <Grid item xs={4}>
            <Winner />
          </Grid>
          <Grid item xs={4}>
            <Winner />
          </Grid>
        </Grid>
      </Container>
    </WinnersS>
  )
}

export default Winners