<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div class="flex flex-col space-y-8">
      <div class="flex flex-col items-center space-y-4">
        <div
          class="flex items-center space-x-2 text-neutral-900 dark:text-neutral-200"
        >
          <img :src="blockie" class="object-cover w-8 h-8 rounded-md" />
          <div>
            <h4 class="text-base font-bold md:text-lg slashed-zero">
              {{ privateAddress }}
            </h4>
            <a
              v-if="ensAccount?.name"
              :href="`${ENS_BASE_URL}${address}`"
              class="text-xs font-semibold"
              >{{ "@" + ensAccount.name }}</a
            >
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-center w-full gap-4 md:flex-row"
        >
          <a
            :href="`${EXPLORER_BASE_URL}address/${address}`"
            target="_blank"
            class="flex items-center space-x-1 text-xs font-semibold text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            ><span>View on Polygonscan</span> <ExternalLinkIcon class="w-4 h-4"
          /></a>

          <AppTooltip class="group" :show="copied">
            <template #element
              ><button
                class="flex items-center space-x-1 text-xs font-semibold text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                @click.prevent="copy(address)"
              >
                <span>Copy address</span
                ><ClipboardCopyIcon class="w-4 h-4" /></button
            ></template>
            <template #text>Copied</template>
          </AppTooltip>
        </div>
      </div>

      <ul class="flex flex-col w-full space-y-2">
        <li
          class="relative flex items-center justify-start p-4 space-x-4 bg-white dark:text-neutral-400 bg-opacity-60 text-neutral-600 dark:bg-neutral-800 dark:bg-opacity-80 h-14 rounded-xl"
        >
          <PolygonIcon class="block w-6 h-6 -translate-x-1" />

          <div class="absolute text-sm font-semibold left-8">
            <span class="block slashed-zero">{{ privateAddress }}</span>
            <span class=""
              >Matic
              <span class="italic"
                >{{ balance }} - ${{ usdBalance }}</span
              ></span
            >
          </div>
        </li>

        <li
          class="relative flex transition-colors duration-200 bg-white dark:text-neutral-400 bg-opacity-60 text-neutral-600 dark:bg-neutral-800 dark:bg-opacity-80 rounded-xl hover:text-neutral-900 dark:hover:text-neutral-200"
        >
          <router-link
            class="flex items-center justify-start w-full p-4 space-x-4 h-14"
            :to="`/user/${address}/collected`"
            @click.prevent="$emit('update:modelValue', false)"
          >
            <CollectionIcon class="w-4 h-4"></CollectionIcon>
            <span class="absolute block text-sm font-semibold left-8"
              >My Collection</span
            >
          </router-link>
        </li>

        <li
          class="relative flex transition-colors duration-200 bg-white dark:text-neutral-400 bg-opacity-60 text-neutral-600 dark:bg-neutral-800 dark:bg-opacity-80 rounded-xl hover:text-neutral-900 dark:hover:text-neutral-200"
        >
          <router-link
            class="flex items-center justify-start w-full p-4 space-x-4 h-14"
            :to="`/user/${address}/collected`"
            @click.prevent="$emit('update:modelValue', false)"
          >
            <SwitchVerticalIcon class="w-4 h-4"></SwitchVerticalIcon>
            <span
              class="absolute block text-sm font-semibold tracking-wide left-8"
              >My activity</span
            >
          </router-link>
        </li>
      </ul>

      <AppButton
        @click.prevent="
          $emit('update:modelValue', false);
          signOut();
        "
      >
        Sign out</AppButton
      >
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import AppModal from "@/components/app/AppModal.vue";
import AppTooltip from "@/components/app/AppTooltip.vue";
import AppButton from "@/components/app/AppButton.vue";
import PolygonIcon from "@/components/icons/PolygonIcon.vue";
import { useWallet } from "@/composables/useWallet";
import { SwitchVerticalIcon } from "@heroicons/vue/solid";
import {
  CollectionIcon,
  ClipboardCopyIcon,
  ExternalLinkIcon,
} from "@heroicons/vue/outline";
import { useFetch } from "@vueuse/core";
import { getTokenHourData } from "@/services/graphql/types";
import {
  UNISWAP_SUBGRAPH_POLYGON,
  EXPLORER_BASE_URL,
  ENS_BASE_URL,
} from "@/utils/constants";
import { useClipboard } from "@vueuse/core";

defineEmits(["update:modelValue", "clicked"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  privateAddress: {
    type: String,
    default: "",
  },
  blockie: {
    type: String,
    default: "",
  },
  ensAccount: {
    type: Object,
    default: () => ({}),
  },
});

const { address, getBalance, disconnect } = useWallet();
const { copy, copied } = useClipboard({ copiedDuring: 2000 });
const balance = ref<string>("");
const maticPrice = ref<string>("");

const usdBalance = computed<string>(() => {
  return (
    balance.value &&
    maticPrice.value &&
    (Number(balance.value) * Number(maticPrice.value) || 0).toFixed(2)
  );
});

const { data, execute, onFetchResponse } = useFetch(UNISWAP_SUBGRAPH_POLYGON, {
  timeout: 10000,
})
  .post(
    JSON.stringify({
      query: getTokenHourData,
    })
  )
  .json();

const signOut = (): void => {
  setTimeout(disconnect, 500);
};

onFetchResponse(() => {
  if (data?.value?.data?.tokenHourDatas?.length) {
    maticPrice.value = data.value.data.tokenHourDatas[0].close;
  }
});

watch(
  () => props.modelValue,
  async () => {
    if (props.modelValue) {
      execute();
      const amount = await getBalance();
      balance.value = Number(amount || 0).toFixed(4);
    }
  }
);
</script>
