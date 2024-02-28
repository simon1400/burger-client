import BlockContent from "components/BlockContent"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"

export const getServerSideProps = (async () => {

  return { 
    props: { 
      votes: true
    } 
  }
})

const Dekujem: NextPage = () => {

  return (
    <Page>
      <div style={{margin: '40px 0 100px'}}>
        <Head data={"Děkujeme!"}/>
        <BlockContent margin content={"<p>Tvoje hlasování jsme zaznamenali. Výsledky najdeš nejpozději v pondělí na webu <a href='burgerfestival.cz'>burgerfestival.cz</a> a v události na Facebooku. Výherce budeme zároveň kontaktovat na e-mailu.</p>"} />
      </div>
    </Page>
  )
}

export default Dekujem