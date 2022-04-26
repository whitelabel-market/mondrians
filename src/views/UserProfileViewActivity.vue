<template>
  <ActivitySkeleton v-if="!isFinished" />
  <Activity
    v-if="isFinished && transfers.length"
    :transfers="transfers"
    :tokenHourDatas="tokenHourDatas"
  />
  <div
    v-if="isFinished && !transfers.length"
    class="flex flex-col items-center gap-4 py-32 mx-auto flex-0"
  >
    <h3 class="text-lg font-bold text-gray-900">No activity</h3>
    <div
      class="flex flex-col items-center text-base font-medium leading-tight text-gray-600"
    >
      <span
        >{{
          `It seems there is no activity in this collection for ${
            isSelf ? "your" : "this"
          } account.`
        }}
      </span>
      <span>
        You should consider to create a Mondrian &#128640; and make some noise
        to promote the collection &#128172;
      </span>
    </div>
    <AppButton :to="'/'" :size="'md'" :fullWidth="false" class="px-4"
      >Create Mondrian</AppButton
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";
import { useWallet } from "@/composables/useWallet";
import { getActivity, getTokenHourData } from "@/services/graphql/types";
import { MAMO_SUBGRAPH, UNISWAP_SUBGRAPH } from "@/utils/constants";
import AppButton from "@/components/app/AppButton.vue";
import Activity from "@/components/activity/Activity.vue";
import ActivitySkeleton from "@/components/activity/ActivitySkeleton.vue";

const transfers = ref([]);
const tokenHourDatas = ref([]);

const route = useRoute();
const { address } = useWallet();

const emits = defineEmits(["makeSign"]);

const { post, onFetchResponse, data, isFinished } = useFetch(MAMO_SUBGRAPH, {
  timeout: 10000,
}).json();

const getHourData = () => {
  const { data: hourDatas, onFetchResponse: onHourDataResponse } = useFetch(
    UNISWAP_SUBGRAPH,
    {
      timeout: 10000,
    }
  )
    .post(
      JSON.stringify({
        query: getTokenHourData,
        variables: {
          startTime: Number(transfers.value[0].createdAtTimestamp),
        },
      })
    )
    .json();

  onHourDataResponse(() => {
    if (hourDatas?.value?.data?.tokenHourDatas?.length) {
      tokenHourDatas.value = hourDatas.value.data.tokenHourDatas;
    }
  });
};

onFetchResponse(() => {
  if (data?.value?.data?.account) {
    transfers.value = [
      ...data.value.data.account.transfersFrom,
      ...data.value.data.account.transfersTo,
    ];
    getHourData();
  } else {
    emits("makeSign");
  }
});

const isSelf = computed(
  () => address.value.toLowerCase() === route.params.id.toLowerCase()
);

watch(
  route,
  () => {
    if (route?.params?.id)
      post(
        JSON.stringify({
          query: getActivity,
          variables: {
            address: route.params.id.toLowerCase(),
          },
        })
      ).execute();
  },
  { deep: true, immediate: true }
);
</script>
