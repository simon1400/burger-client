import { Container, Grid } from "@mui/material"
import Winner from "components/Winner"
import { WinnersS } from "./styled"
import { FC } from "react"

const Winners: FC<{
  winner1: IWinner;
  winner2: IWinner;
  winner3: IWinner;
}> = ({
  winner1,
  winner2,
  winner3,
}) => {
  return (
    <WinnersS>
      <Container maxWidth="md">
        <Grid container>
          {winner1.data && <Grid item xs={12} md={4}>
            <Winner place="1" data={winner1} />
          </Grid>}
          {winner2.data && <Grid item xs={12} md={4}>
            <Winner place="2" data={winner2} />
          </Grid>}
          {winner3.data && <Grid item xs={12} md={4}>
            <Winner place="3" data={winner3} />
          </Grid>}
        </Grid>
      </Container>
    </WinnersS>
  )
}

export default Winners