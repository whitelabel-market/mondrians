<template>
  <div
    class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lgs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    v-if="
      !isFinished || (isFinished && transfers.length && !tokenDayDatas.length)
    "
  >
    <div
      v-for="i of 5"
      :key="i"
      class="block w-full focus:outline-none focus:ring-2 focus:ring-blueish"
    >
      <ActivitySkeleton />
    </div>
  </div>
  <div
    class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lgs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    v-if="isFinished && transfers.length && tokenDayDatas.length"
  >
    <div
      v-for="(transfer, index) in (transfers as any[])"
      :key="index"
      class="block w-full focus:outline-none focus:ring-2 focus:ring-blueish"
    >
      <Activity :transfer="transfer" :tokenDayDatas="tokenDayDatas" />
    </div>
  </div>
  <NoTokens
    :ensAccount="ensAccount"
    :error="error"
    :aborted="aborted"
    v-if="isFinished && !transfers.length"
  />
</template>

<script setup lang="ts">
import { inject, Ref, ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { getActivity, getTokenDayData } from "@/services/graphql/types";
import { MAMO_SUBGRAPH, UNISWAP_SUBGRAPH_POLYGON } from "@/utils/constants";
import Activity from "@/components/activity/Activity.vue";
import ActivitySkeleton from "@/components/activity/ActivitySkeleton.vue";
import NoTokens from "@/components/user/NoTokens.vue";
import { EnsAccount, ENS_ACCOUNT } from "@/utils/types";

const emits = defineEmits(["showHint"]);

const transfers = ref<any[]>([]);
const tokenDayDatas = ref([]);
const ensAccount = inject<Ref<EnsAccount>>(ENS_ACCOUNT);

// transfers fetch handling

const { onFetchResponse, data, isFinished, post, error, aborted } = useFetch(
  MAMO_SUBGRAPH,
  {
    timeout: 10000,
    immediate: false,
  }
).json();

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

watch(
  () => ensAccount,
  () => {
    if (ensAccount?.value?.id) {
      post(
        JSON.stringify({
          query: getActivity,
          variables: {
            address: ensAccount?.value?.id.toLowerCase(),
          },
        })
      ).execute();
    }
  },
  { deep: true }
);

// fetch prices handling

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
</script>
