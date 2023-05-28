import { Container, Typography } from "@mui/material"
import { BlockContentS, HeadWrap } from "./styled"
import { FC } from "react"
import { CenterWrap } from "styles/CenterWrap"

const BlockContent: FC<IBlockContent> = ({time, content, margin}) => {
  return (
    <BlockContentS margin>
      <Container maxWidth="md">
        <CenterWrap>
          <HeadWrap>
            <Typography variant="h2">Burger Street Festivaly 2023</Typography>
            {time && <time>28.4. - 30.4. 2023</time>}
          </HeadWrap>
          {content && <Typography component="div">
            <p>Milujete burgery? Tak to jste u nás správně. Přímo k vám do města přivezeme ty nejvymazlenější burgery z celé země. Jen na Burger Street Festivalu ochutnáte kousky, za kterými byste jinak museli jet přes celou Českou republiku.

            A nemusí v nich být jen hovězí. Máme burgery vegetariánské, veganské, s bezlepkovou houskou. A co třeba zkusit místo hovězího třeba lososa? I takové speciality u nás najdete. Jako správní burgeromaniaci víme, že k skvělému jídlu patří i skvělé pití. A na konec i sladká tečka.

            To zní dobře, že? A kolik vás to bude stát? Nic! Vstup na Burger Street Festival je vždy zdarma. Program si můžete užít dosyta a je jen na vás, kolik toho ochutnáte.

            Aktuální informace a našich festivalech najdete vždy na našem facebookovém profilu – sledujte jej a nezapomeňte si zaškrtnout festivaly, které vás zajímají.

            Budeme se na vás těšit.</p>
          </Typography>}
        </CenterWrap>
      </Container>
    </BlockContentS>
  )
}

export default BlockContent