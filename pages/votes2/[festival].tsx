import { client } from "lib/api";
import { NextPage } from "next";
import { getFestival } from "queries/festivals";
import { wrapper } from "stores";
import { changeDescription, changeTitle } from "stores/slices/metaSlices";

import VotesFestival from "layout/votes/Festival";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { data } = await client.query({
      query: getFestival,
      variables: {
        slug: ctx.params?.festival
      }
    });

    const festivalLinup = data.festivals.data[0].attributes.lineup.data;
    const idFestival = data.festivals.data[0].id
    const festivalBurgers: any = []

    festivalLinup.map((item: any) => {
      item.attributes.category.data.map((categoryItem: any) => {
        if(categoryItem.attributes.title === "Burgrárna"){
          festivalBurgers.push(item)
        }
      })
    })

    const transformFestivalBurgers = festivalBurgers.map((item: any) => ({
      label: item.attributes.title,
      disabled: false
    }))

    store.dispatch(changeTitle("Hlasování"));
    store.dispatch(changeDescription("Hlasování"));

    return {
      props: {
        festivalBurgers: transformFestivalBurgers,
        votes: true,
        idFestival
      },
    };
  }
);

const Votes: NextPage<{ 
  festivalBurgers: any; 
  idFestival: number 
}> = (props) => 
  <VotesFestival {...props} />

export default Votes
