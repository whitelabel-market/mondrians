<template>
  <div class="z-10 shadow-default">
    <div
      class="flex flex-col justify-between h-full gap-6 p-4 transition-all duration-200 border rounded select-none text-neutral-200 bg-neutral-50 dark:bg-neutral-800 border-neutral-800 bg-hero-pattern-token dark:bg-dark-hero-pattern-token"
    >
      <div
        class="flex flex-col justify-center transition-colors duration-200 text-neutral-900 dark:text-neutral-200"
      >
        <div class="flex items-center justify-between">
          <span class="font-bold leading-tight truncate">Transaction</span>
          <a
            class="text-xs leading-tight truncate transition-colors duration-200 dark:text-neutral-400 dark:hover:text-neutral-200"
            target="_blank"
            :href="`${CONFIG.explorerBaseUrl}block/${transfer.createdAtBlockNumber}`"
            >{{
              `${new Date(
                transfer.createdAtTimestamp * 1000
              ).toDateString()} (${transfer.createdAtBlockNumber})`
            }}</a
          >
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <a
          :href="`${CONFIG.explorerBaseUrl}address/${transfer.from.id}`"
          target="_blank"
          class="flex items-center space-x-2 truncate transition-colors duration-200 cursor-pointer text-neutral-900 dark:text-neutral-400 hover:text-neutral-400 dark:hover:text-neutral-200"
        >
          <img
            :src="makeBlockie(transfer.from.id)"
            class="w-8 h-8 my-auto rounded-full"
          />
          <span class="text-sm truncate slashed-zero">{{
            getShortAddress(transfer.from.id)
          }}</span>
        </a>
        <div class="flex items-center gap-4">
          <div
            class="flex items-center justify-center w-8 transition-colors duration-200 text-neutral-900 dark:text-neutral-200"
          >
            <ArrowSmDownIcon class="w-5 h-5" />
          </div>
          <a
            class="px-4 py-1 border-2 rounded cursor-pointer border-dodgerblue text-dodgerblue"
            :href="`${CONFIG.explorerBaseUrl}tx/${transfer.transactionHash}`"
            target="_blank"
          >
            mint()
          </a>
        </div>
        <a
          :href="`${CONFIG.explorerBaseUrl}address/${transfer.to.id}`"
          target="_blank"
          class="flex items-center space-x-2 truncate transition-colors duration-200 cursor-pointer text-neutral-900 dark:text-neutral-400 hover:text-neutral-400 dark:hover:text-neutral-200"
        >
          <img
            :src="makeBlockie(transfer.to.id)"
            class="w-8 h-8 my-auto rounded-full"
          />
          <span class="text-sm truncate slashed-zero">{{
            getShortAddress(transfer.to.id)
          }}</span>
        </a>
      </div>
      <div
        v-if="tokenDayDatas?.length"
        class="flex flex-col transition-colors duration-200 text-neutral-900 dark:text-neutral-200"
      >
        <div class="flex items-center justify-between">
          <span class="flex flex-col items-start text-sm font-semibold"
            >Price</span
          >
          <div class="flex items-end gap-2 text-sm">
            <div class="flex items-center justify-end gap-2">
              <span class="truncate">{{ weiToEth(transfer.value) }}</span
              ><PolygonIcon class="w-2" />&#126;
              <span
                >{{ (getPrice * weiToEth(transfer.value)).toFixed(4) }}$</span
              >
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="flex flex-col items-start text-sm font-semibold">
            Gas cost
          </span>
          <div class="flex items-end gap-2 text-sm">
            <div class="flex items-center justify-end gap-2">
              <span class="truncate"
                >{{ weiToGwei(transfer.gasPrice).toFixed(2) }} (gwei)</span
              ><PolygonIcon class="w-2" />&#126;
              <span
                >{{
                  (getPrice * weiToEth(transfer.gasPrice)).toFixed(4)
                }}$</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PolygonIcon from "@/components/icons/PolygonIcon.vue";
import makeBlockie from "ethereum-blockies-base64";
import { getShortAddress, weiToGwei, weiToEth } from "@/utils/ethereum";
import { ArrowSmDownIcon } from "@heroicons/vue/solid";
import CONFIG from "../../../../config.js";
import { computed, onMounted, ref } from "vue";
import { useFetch } from "@vueuse/core";
import { getTokenDayData } from "@/services/graphql/types";

const props = defineProps({
  transfer: {
    type: Object,
    required: true,
  },
});

// fetch historic prices

const tokenDayDatas = ref<any[]>([]);

const getPrice = computed(() => {
  const { close, high, low, open } = tokenDayDatas.value[0];
  return [close, high, low, open].reduce((a, b) => Number(a) + Number(b)) / 4;
});

onMounted(() => {
  const { data: dayDatas, onFetchResponse: onDayDataResponse } = useFetch(
    CONFIG.subgraph.uniswapPolygon,
    {
      timeout: 10000,
    }
  )
    .post(
      JSON.stringify({
        query: getTokenDayData,
        variables: {
          startTime: Number(props.transfer.createdAtTimestamp),
          first: 1,
        },
      })
    )
    .json();
  onDayDataResponse(() => {
    if (dayDatas?.value?.data?.tokenDayDatas?.length) {
      tokenDayDatas.value = dayDatas.value.data.tokenDayDatas;
    }
  });
});
</script>
