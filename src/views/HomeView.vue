<template>
  <div>
    <HomeHero />
    <HomeAbout />
    <HomeItemGallery />
    <HomeRoadmap />
    <HomeRarity />
    <HomeInfo />
    <HomeFaq />
    <HomeCta />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeAbout from "@/components/home/HomeAbout.vue";
import HomeItemGallery from "@/components/home/HomeItemGallery.vue";
import HomeRoadmap from "@/components/home/HomeRoadmap.vue";
import HomeRarity from "@/components/home/HomeRarity.vue";
import HomeInfo from "@/components/home/HomeInfo.vue";
import HomeFaq from "@/components/home/HomeFaq.vue";
import HomeCta from "@/components/home/HomeCta.vue";
import { provideApolloClient, useSubscription } from "@vue/apollo-composable";
import { client } from "@/services/graphql";
import gql from "graphql-tag";

export default defineComponent({
  components: {
    HomeHero,
    HomeAbout,
    HomeItemGallery,
    HomeRoadmap,
    HomeRarity,
    HomeInfo,
    HomeFaq,
    HomeCta,
  },
  setup() {
    // const { result, refetch } = provideApolloClient(client)(() =>
    //   useQuery(
    //     gql`
    //       query MyQuery {
    //         contracts {
    //           id
    //           name
    //           symbol
    //           totalSupply
    //         }
    //       }
    //     `
    //   )
    // );

    // const contracts = useResult(result, null, ({ contracts }) => contracts);

    // watchEffect(() => {
    //   console.log(contracts.value);
    // });

    const { result } = provideApolloClient(client)(() =>
      useSubscription(gql`
        subscription {
          contracts {
            id
            name
            symbol
            totalSupply
          }
        }
      `)
    );

    watch(
      result,
      (data) => {
        console.log("New message received:", data);
      },
      {
        // lazy: true, // Don't immediately execute handler
      }
    );
  },
});
</script>
