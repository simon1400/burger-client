import { Container } from "@mui/material";
import { FooterS } from "./styled";
import { useQuery } from "@apollo/client";
import footerQuery from "queries/footer";
import Partners from "components/Partners";
import Follow from "components/Follow";
import FooterBottom from "components/FooterBottom";
import { useRouter } from "next/router";

const Footer = () => {
  const {data, loading} = useQuery(footerQuery)

  const router = useRouter()

  if(!data || loading) {
    return null
  }

  const footer = data.global.data.attributes

  return (
    <FooterS>
      <Container maxWidth="xl">
        <hr />
      </Container>
      {router.asPath === "/partneri" ? null :<Partners data={footer.logoPartners.data} />}
      <Follow data={footer.soc} />
      <FooterBottom email={footer.email} phone={footer.phone} />
    </FooterS>
  );
};

export default Footer;
