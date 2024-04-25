import axios from "axios"
import BlockContent from "components/BlockContent"
import Head from "components/Head"
import Page from "layout/Page"

const APP_API = process.env.APP_API;

export const getServerSideProps = (async (ctx: any) => {
  axios
    .put(`${APP_API}/api/votes/${ctx.params?.id}`, { data: {mailConfirm: true} })
    .then(() => {
      console.log('Updated!')
    }).catch((err) => console.log("err updated form -- ", err.response.data.error));
  
  return { 
    props: { 
      votes: true
    } 
  }
})



const ConfirmMail = () => {

  return (
    <Page>
      <div style={{margin: '40px 0 100px'}}>
        <Head data={"Ověření proběhlo!"}/>
        <BlockContent margin content={"<p>Ověření proběhlo správně. Díky za tvůj hlas a přejeme, ať jsi mezi výherci!</p>"} />
      </div>
    </Page>
  )
}

export default ConfirmMail