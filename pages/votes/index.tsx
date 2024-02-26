import BlockContent from "components/BlockContent"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import { wrapper } from "stores"
import { client } from "lib/api"
import { festivalsQuery } from "queries/festivals"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"
import Button from "components/Button"
import { CenterWrap } from "styles/CenterWrap"
import { filterEvents } from "helpers/filterEvents"


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {

    const { data } = await client.query({
      query: festivalsQuery,
    });

    const festivals = data.festivals.data.map((item: any) => item.attributes)
    const filteredFestivals = filterEvents(festivals)

    store.dispatch(changeTitle('Votes'))
    store.dispatch(changeDescription(''))

    return {
      props: {
        festivals: filteredFestivals.future[0],
      }
    };
  }
);

const Votes: NextPage<{festivals: any}> = ({festivals}) => {

  return (
    <Page>
      <div>
        <Head data={festivals.title}/>
        <BlockContent head={festivals.place} margin content={festivals.content} />
        <CenterWrap marginBottom={80}>
          <Button href={`/votes/${festivals.slug}`}>Začít hlasovat</Button>
        </CenterWrap>
      </div>
    </Page>
  )
}

export default Votes