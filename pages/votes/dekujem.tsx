import BlockContent from "components/BlockContent"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"

const Dekujem: NextPage = () => {

  return (
    <Page>
      <div>
        <Head data={"Děkujeme!"}/>
        <BlockContent margin content={"text text text text text text text text text text text text text text text text text text text text text"} />
      </div>
    </Page>
  )
}

export default Dekujem