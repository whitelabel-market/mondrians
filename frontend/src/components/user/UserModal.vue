<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="
      ($event) => {
        $emit('update:modelValue', $event);
        emailAddress = '';
      }
    "
  >
    <div class="flex flex-col space-y-4">
      <div class="flex items-center self-center pb-4 space-x-2">
        <img
          :src="makeBlockie(address)"
          :alt="address"
          class="object-cover w-8 h-8 rounded"
        />
        <div>
          <h4 class="block text-xl font-bold slashed-zero leading-0">
            {{ ensAccount?.name ? "@" + ensAccount.name : privateAddress }}
          </h4>
          <a
            v-if="ensAccount?.name"
            :href="`${ENS_BASE_URL}${address}`"
            class="font-semibold"
            >{{ "@" + ensAccount.name }}</a
          >
        </div>
      </div>

      <div>
        <AppButton
          full-width
          color="crimson"
          size="sm"
          :to="`/mint`"
          @click.prevent="$emit('update:modelValue', false)"
          ><ViewGridAddIcon class="w-4 h-4" />
          <span class="block">Create my Magic Mondrian</span>
        </AppButton>
      </div>

      <ul
        class="flex flex-col items-start w-full p-4 space-y-2 bg-white border-2 rounded dark:bg-neutral-900 border-stone-200 dark:border-stone-700"
      >
        <li v-for="(link, name) in routes" :key="name" class="block">
          <router-link
            class="link flex items-center justify-start space-x-1"
            :to="'/user/' + address + '/' + link.to"
            @click.prevent="$emit('update:modelValue', false)"
          >
            <component :is="link.icon" class="w-4 h-4" />
            <span class="block">{{ name }}</span>
          </router-link>
        </li>
      </ul>

      <div
        class="flex flex-col p-4 space-y-2 bg-white border-2 rounded text-sm dark:bg-neutral-900 border-stone-200 dark:border-stone-700"
      >
        <div class="flex items-start justify-between w-full">
          <div>
            <div class="flex items-center space-x-2">
              <img
                :src="makeBlockie(address)"
                :alt="address"
                class="object-cover w-4 h-4 rounded-full"
              />
              <div>
                <h4 class="block font-semibold slashed-zero">
                  {{ privateAddress }}
                </h4>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-start space-x-2">
            <AppButton
              flat
              rounded="full"
              size="xs"
              color="gray"
              :tooltip="'Viw on Polygonscan'"
              only-icon
              :href="`${EXPLORER_BASE_URL}address/${address}`"
            >
              <SearchIcon class="w-4 h-4" />
            </AppButton>

            <AppButton
              flat
              rounded="full"
              size="xs"
              color="gray"
              only-icon
              :tooltip="copied ? 'Copied' : 'Copy address'"
              @click.prevent="copy(address)"
            >
              <ClipboardCopyIcon class="w-4 h-4" />
            </AppButton>
          </div>
        </div>

        <div class="grid grid-cols-[5rem_1fr]">
          <div>Network:</div>
          <div>
            <span class="font-semibold italic">Polygon</span>
          </div>
          <div>Balance:</div>
          <div>
            <div class="flex items-center pb-2 space-x-2">
              <span class="inline-flex items-center space-x-0.5">
                <PolygonIcon class="block w-4 h-4" />
                <span class="block font-semibold italic"
                  >{{ Number(balance).toFixed(2) }}
                </span>
              </span>

              <SwitchHorizontalIcon class="w-3 h-3" />
              <span>
                <span>$&nbsp;</span>
                <span class="font-semibold italic"> {{ usdBalance }} </span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <AppButton
            size="sm"
            full-width
            @click="
              () => {
                $emit('update:modelValue', false);
                signOut();
              }
            "
          >
            Disconnect</AppButton
          >
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import AppModal from "@/components/app/AppModal.vue";
import AppButton from "@/components/app/AppButton.vue";
import PolygonIcon from "@/components/icons/PolygonIcon.vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import {
  CollectionIcon,
  ClipboardCopyIcon,
  SearchIcon,
  SwitchVerticalIcon,
  ViewGridAddIcon,
  PrinterIcon,
  CalendarIcon,
} from "@heroicons/vue/outline";
import { useFetch } from "@vueuse/core";
import { getTokenHourData } from "@/services/graphql/types";
import {
  UNISWAP_SUBGRAPH_POLYGON,
  EXPLORER_BASE_URL,
  ENS_BASE_URL,
} from "@/utils/constants";
import { useClipboard } from "@vueuse/core";
import { useWalletExtended } from "@/composables/useWalletExtended";
import makeBlockie from "ethereum-blockies-base64";
import { SwitchHorizontalIcon } from "@heroicons/vue/outline";
defineEmits(["update:modelValue", "click"]);

defineProps({
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

const { address, disconnect } = useWallet();
const { balance } = useWalletExtended();
const { copy, copied } = useClipboard({ copiedDuring: 2000 });
const maticPrice = ref<string>("");
const emailAddress = ref("");

const routes = {
  "My Collection": {
    icon: CollectionIcon,
    to: `collected`,
  },
  "My Activity": {
    icon: SwitchVerticalIcon,
    to: `activity`,
  },
  "Event Invitation": {
    icon: CalendarIcon,
    to: `event`,
  },
  Print: { icon: PrinterIcon, to: `print` },
};

const usdBalance = computed<string>(() => {
  if (balance.value && maticPrice.value) {
    return (Number(balance.value) * Number(maticPrice.value)).toFixed(2);
  }
  return "0.00";
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

watch(balance, async () => {
  if (Number(balance.value) > 0) {
    execute();
  }
});
</script>
