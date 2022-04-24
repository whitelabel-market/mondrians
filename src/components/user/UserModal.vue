<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div class="flex flex-col gap-4 w-80">
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-2">
          <img :src="blockie" class="object-cover rounded-full w-9 h-9" />
          <div class="flex flex-col">
            <span class="font-bold leading-tight text-md slashed-zero">{{
              privateAddress
            }}</span>
            <a
              :href="`https://app.ens.domains/address/${address}`"
              class="text-xs font-medium leading-tight text-gray-600 hover:text-blueish"
              >@amrap030.eth</a
            >
          </div>
        </div>
        <div class="flex items-center justify-center w-full gap-4">
          <a
            :href="`https://etherscan.io/address/${address}`"
            target="_blank"
            class="flex items-center text-xs font-semibold text-gray-500 hover:text-blueish"
            ><ExternalLinkIcon class="w-4 h-4 mr-1" /><span
              >View on etherscan</span
            ></a
          >
          <AppTooltip class="mr-4 group" :show="copied">
            <template #element
              ><button
                class="flex items-center text-xs font-semibold text-gray-500 hover:text-blueish"
                @click.prevent="copy(address)"
              >
                <span>Copy address</span
                ><ClipboardCopyIcon class="w-4 h-4 ml-1" /></button
            ></template>
            <template #text>Copied!</template>
          </AppTooltip>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm font-bold">Connected</span>
      </div>
      <div
        class="flex items-center justify-between p-3 border-2 bg-gray-50 rounded-xl"
      >
        <div class="flex items-center space-x-2">
          <div class="p-1 rounded-full bg-gray-50">
            <EthereumIcon class="w-6 h-6 inset-1/2" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold leading-tight slashed-zero">{{
              privateAddress
            }}</span>
            <span class="text-xs font-bold leading-tight text-gray-700"
              >Ethereum {{ balance }} - ${{ usdBalance }}</span
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-2 -mt-2">
        <div class="flex flex-col gap-2">
          <AppButton
            :size="'sm'"
            :to="`/user/${address}/collected`"
            :color="'link'"
            class="pl-5 text-gray-700 rounded-xl hover:text-blueish group hover:bg-gray-100"
            @click.prevent="$emit('update:modelValue', false)"
            ><CollectionIcon class="w-5 h-5" /><span class="pl-2"
              >My mondrians</span
            ></AppButton
          >
          <AppButton
            :size="'sm'"
            :color="'link'"
            class="pl-5 text-gray-700 rounded-xl hover:text-blueish hover:bg-gray-100"
            ><SwitchVerticalIcon class="w-5 h-5" /><span class="pl-2"
              >My transactions</span
            ></AppButton
          >
        </div>
        <AppButton
          :size="'sm'"
          @click.prevent="
            $emit('update:modelValue', false);
            signOut();
          "
        >
          Sign out</AppButton
        >
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import AppModal from "@/components/app/AppModal.vue";
import AppTooltip from "@/components/app/AppTooltip.vue";
import AppButton from "@/components/app/AppButton.vue";
import EthereumIcon from "@/components/icons/EthereumIcon.vue";
import { useWallet } from "@/composables/useWallet";
import { SwitchVerticalIcon } from "@heroicons/vue/solid";
import {
  CollectionIcon,
  ClipboardCopyIcon,
  ExternalLinkIcon,
} from "@heroicons/vue/outline";
import { useFetch } from "@vueuse/core";
import { getEthToUsd } from "@/services/graphql/types";
import { SUSHISWAP_SUBGRAPH } from "@/utils/constants";
import { useClipboard } from "@vueuse/core";

defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const { blockie, privateAddress, address, getBalance, disconnect } =
  useWallet();
const { copy, copied } = useClipboard({ copiedDuring: 2000 });
const balance = ref<string>("");
const ethPrice = ref<string>("");

const usdBalance = computed<string>(() => {
  return (
    balance.value &&
    ethPrice.value &&
    (Number(balance.value) * Number(ethPrice.value)).toFixed(2)
  );
});

const { data, execute, onFetchResponse } = useFetch(SUSHISWAP_SUBGRAPH, {
  timeout: 10000,
})
  .post(
    JSON.stringify({
      query: getEthToUsd,
    })
  )
  .json();

const signOut = (): void => {
  setTimeout(disconnect, 500);
};

onFetchResponse(() => {
  if (data?.value?.data?.bundle?.ethPrice) {
    ethPrice.value = data.value.data.bundle.ethPrice;
  }
});

watch(
  () => props.modelValue,
  async () => {
    if (props.modelValue) {
      execute();
      const amount = await getBalance();
      balance.value = Number(amount).toFixed(4);
    }
  }
);
</script>
