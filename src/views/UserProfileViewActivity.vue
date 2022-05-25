<template>
  <ActivitySkeleton v-if="!isFinished" />
  <Activity
    v-if="isFinished && transfers.length"
    :transfers="transfers"
    :tokenDayDatas="tokenDayDatas"
  />
  <div
    class="flex flex-col items-center mx-auto space-y-8 text-center flex-0"
    v-if="isFinished && !transfers.length"
  >
    <h3 class="text-2xl font-bold">No activity</h3>
    <div>
      <p>
        {{
          `It seems there is no activity in this collection for ${
            isSelf ? "your" : "this"
          } account.`
        }}
      </p>
      <p>
        You should consider to create a Mondrian &#128640; and make some noise
        to promote the collection &#128172;
      </p>
    </div>

    <AppButton color="reddish" :to="'/'">Create Mondrian</AppButton>
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

const transfers = ref<any[]>([]);
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
            address: (route.params.id as string).toLowerCase(),
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

const isSelf =
  address.value.toLowerCase() === (route.params.id as string).toLowerCase();
</script>
