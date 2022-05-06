<template>
  <ActivitySkeleton v-if="!isFinished" />
  <Activity
    v-if="isFinished && transfers.length"
    :transfers="transfers"
    :tokenDayDatas="tokenDayDatas"
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
    <AppButton :to="'/'">Create Mondrian</AppButton>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";
import { useWallet } from "@/composables/useWallet";
import { getActivity, getTokenDayData } from "@/services/graphql/types";
import { MAMO_SUBGRAPH, UNISWAP_SUBGRAPH_POLYGON } from "@/utils/constants";
import AppButton from "@/components/app/AppButton.vue";
import Activity from "@/components/activity/Activity.vue";
import ActivitySkeleton from "@/components/activity/ActivitySkeleton.vue";

const transfers = ref([]);
const tokenDayDatas = ref([]);

defineProps({
  address: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const { address } = useWallet();

const emits = defineEmits(["showHint"]);

const { post, onFetchResponse, data, isFinished } = useFetch(MAMO_SUBGRAPH, {
  timeout: 10000,
}).json();

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

onFetchResponse(() => {
  if (data?.value?.data?.account) {
    transfers.value = [
      ...data.value.data.account.transfersFrom,
      ...data.value.data.account.transfersTo,
    ];
    getDayData();
  } else {
    emits("showHint");
  }
});

const getDayData = () => {
  const { data: dayDatas, onFetchResponse: onDayDataResponse } = useFetch(
    UNISWAP_SUBGRAPH_POLYGON,
    {
      timeout: 10000,
    }
  )
    .post(
      JSON.stringify({
        query: getTokenDayData,
        variables: {
          startTime: Number(transfers.value[0].createdAtTimestamp),
        },
      })
    )
    .json();

  onDayDataResponse(() => {
    if (dayDatas?.value?.data?.tokenDayDatas?.length) {
      tokenDayDatas.value = dayDatas.value.data.tokenDayDatas;
    }
  });
};

const isSelf = address.value.toLowerCase() === route.params.id.toLowerCase();
</script>
