import { Container } from "@mui/material";
import { HeaderS } from "./styled";
import Logo from "components/Logo";
import Nav from "components/Nav";

const Header = () => {

  return (
    <Container maxWidth="xl">
      <HeaderS>
        <Logo />
        <Nav />
      </HeaderS>
    </Container>
  );
};

export default Header;
