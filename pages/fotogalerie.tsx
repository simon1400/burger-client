import BlockContent from "components/BlockContent"
import Head from "components/Head"
import Page from "layout/Page"
import { NextPage } from "next"
import Galery from "components/Galery"
import { wrapper } from "stores"
import { client } from "lib/api"
import { festivalsGaleryQuery } from "queries/festivals"
import { changeDescription, changeTitle } from "stores/slices/metaSlices"

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: festivalsGaleryQuery,
    });

    const galeryData = data.festivals.data.map((item: any) => item.attributes);

    store.dispatch(changeTitle(galeryData.meta?.title || 'Fotogalerie'))
    store.dispatch(changeDescription(galeryData.meta?.description || 'Fotogalerie'))

    return {
      props: {
        galeryData,
      }
    };
  }
);

const GaleryPage: NextPage<{galeryData: any}> = ({galeryData}) => {
  return (
    <Page>
      {galeryData.map((item: any, idx: number) => <div key={idx}>
        <Head data={item.title} />
        <BlockContent time={{from: item.from, to: item.to}} head={item.place} />
        {!!item.galery.data?.length && <Galery images={item.galery} />}
      </div>)}
    </Page>
  )
}

export default GaleryPage