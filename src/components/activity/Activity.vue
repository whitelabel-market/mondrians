<template>
  <div
    class="grid grid-cols-6 grid-rows-1 px-3 py-2 font-medium text-gray-900 border-t-2 border-l-2 border-r-2 border-gray-100 rounded-t-lg gap-x-2"
  >
    <div>Event</div>
    <div>From</div>
    <div>To</div>
    <div>Amount</div>
    <div>Gas</div>
    <div>Date</div>
  </div>
  <div
    v-for="(transfer, index) in transfers"
    :key="transfer.id"
    :index="index"
    class="grid grid-cols-6 grid-rows-1 px-3 py-2 text-base text-gray-700 border-2 border-gray-100 h-14 gap-x-2"
    :class="[
      index > 0 && 'border-t-0',
      index === transfers.length - 1 && 'rounded-b-lg',
    ]"
  >
    <a
      :href="`${EXPLORER_BASE_URL}tx/${transfer.transactionHash}`"
      target="_blank"
      class="flex items-center space-x-2"
    >
      <DocumentAddIcon class="w-5 h-5 text-gray-700" />
      <span class="truncate"> Mint </span>
    </a>
    <div v-if="transfer" class="flex truncate">
      <a
        :href="`${EXPLORER_BASE_URL}address/${transfer.from.id}`"
        target="_blank"
        class="flex items-center space-x-2 truncate cursor-pointer"
      >
        <img
          :src="makeBlockie(transfer.from.id)"
          class="w-8 h-8 my-auto rounded-full"
        />
        <span class="truncate slashed-zero">{{
          getShortAddress(transfer.from.id)
        }}</span>
      </a>
    </div>
    <div v-if="transfer" class="flex truncate">
      <a
        :href="`${EXPLORER_BASE_URL}address/${transfer.to.id}`"
        target="_blank"
        class="flex items-center space-x-2 truncate cursor-pointer"
      >
        <img
          :src="makeBlockie(transfer.to.id)"
          class="w-8 h-8 my-auto rounded-full"
        />
        <span class="truncate slashed-zero">{{
          getShortAddress(transfer.to.id)
        }}</span>
      </a>
    </div>
    <div class="flex items-center gap-2">
      <span class="truncate">{{ weiToEth(transfer.value) }}</span
      ><PolygonIcon class="w-3" />&#126;
      <span v-if="tokenDayDatas.length"
        >{{
          (
            getPrice(transfer.createdAtTimestamp) * weiToEth(transfer.value)
          ).toFixed(2)
        }}$</span
      >
    </div>
    <div class="flex items-center gap-2">
      <span class="truncate">{{ weiToGwei(transfer.gasPrice).toFixed(2) }}</span
      ><PolygonIcon class="w-3" /><span>(gwei)</span>
    </div>
    <div class="flex items-center">
      <a class="truncate" target="_blank">{{
        new Date(Number(transfer.createdAtTimestamp * 1000)).toDateString()
      }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import PolygonIcon from "@/components/icons/PolygonIcon.vue";
import makeBlockie from "ethereum-blockies-base64";
import { getShortAddress, weiToGwei, weiToEth } from "@/utils/ethereum";
import { DocumentAddIcon } from "@heroicons/vue/outline";
import { EXPLORER_BASE_URL } from "@/utils/constants";

const props = defineProps({
  transfers: {
    type: Array,
    required: true,
  },
  tokenDayDatas: {
    type: Array,
  },
});

const getPrice = (timestamp) => {
  const hourData = props.tokenDayDatas.find(
    (data) => data.date >= Number(timestamp)
  );
  return Number(hourData.close);
};
</script>
