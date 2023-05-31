import { Container } from "@mui/material";
import { HeaderS } from "./styled";
import Logo from "components/Logo";
import Nav from "components/Nav";
import navTopQuery from "queries/nav";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

const Header = () => {

  const [nav, setNav] = useState([])

  const {data, loading} = useQuery(navTopQuery)
  // const mediaMd = useMediaQuery("(max-width: 940px)")
  // const router = useRouter()

  useEffect(() => {
    if(!loading) {
      setNav(data.nav.data.attributes.topNav)
    }
  }, [loading])

  // useEffect(() => {
  //   setOpen(false)
  // }, [router])

  // const [isOpen, setOpen] = useState(false)

  console.log(nav)

  return (
    <Container maxWidth="xl">
      <HeaderS>
        <Logo />
        <Nav data={nav}/>
      </HeaderS>
    </Container>
  );
};

export default Header;
