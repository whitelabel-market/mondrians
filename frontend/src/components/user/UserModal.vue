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
    <div class="flex flex-col space-y-8">
      <div class="flex flex-col items-center space-y-4">
        <div
          class="flex items-center space-x-2 text-neutral-900 dark:text-neutral-200"
        >
          <img
            :src="makeBlockie(address)"
            class="object-cover w-8 h-8 rounded-md"
          />
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

        <div class="flex items-center justify-center w-full gap-4">
          <a
            :href="`${EXPLORER_BASE_URL}address/${address}`"
            target="_blank"
            class="flex items-center space-x-1 text-xs font-semibold outline-none text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            ><span>View on Polygonscan</span> <ExternalLinkIcon class="w-4 h-4"
          /></a>

          <AppTooltip class="group" :show="copied">
            <template #element
              ><button
                class="flex items-center space-x-1 text-xs font-semibold outline-none text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                @click.prevent="copy(address)"
              >
                <span>Copy address</span
                ><ClipboardCopyIcon class="w-4 h-4" /></button
            ></template>
            <template #text>Copied</template>
          </AppTooltip>
        </div>
      </div>

      <ul class="flex flex-col w-full gap-4">
        <li
          class="relative flex items-center justify-start p-4 space-x-4 bg-white dark:text-neutral-400 bg-opacity-60 text-neutral-600 dark:bg-neutral-800 dark:bg-opacity-80 h-14 rounded-xl"
        >
          <PolygonIcon class="block w-6 h-6 -translate-x-1" />

          <div class="absolute text-sm font-semibold left-8">
            <span class="block slashed-zero">{{ privateAddress }}</span>
            <span class=""
              >Matic
              <span class="italic"
                >{{ Number(balance).toFixed(2) }} - ${{ usdBalance }}</span
              ></span
            >
          </div>
        </li>
        <li>
          <router-link
            @click.prevent="$emit('update:modelValue', false)"
            class="relative flex items-stretch text-xs font-semibold tracking-wider uppercase transition duration-200 transform cursor-pointer justify-stretch ease-out-circ rounded-xl after:block after:absolute after:bottom-0 after:right-0 after:w-full after:h-full after:border-neutral-800 after:-z-10 after:bg-neutral-800 after:rounded-xl group active:scale-95 after:transform after:translate-x-1 after:translate-y-1 h-11"
            :to="`/user/${address}/collected`"
          >
            <span
              class="flex items-center justify-center w-full px-8 py-3 space-x-2 text-white transition duration-200 transform border-2 ease-out-circ rounded-xl group-hover:translate-x-1 group-hover:translate-y-1 bg-blueish border-neutral-800"
              ><CollectionIcon class="w-5 h-5"></CollectionIcon>
              <span class="font-semibold tracking-wider uppercase"
                >My Collection</span
              ></span
            >
          </router-link>
        </li>
        <li>
          <router-link
            @click.prevent="$emit('update:modelValue', false)"
            class="relative flex items-stretch text-xs font-semibold tracking-wider uppercase transition duration-200 transform cursor-pointer justify-stretch ease-out-circ rounded-xl after:block after:absolute after:bottom-0 after:right-0 after:w-full after:h-full after:border-neutral-800 after:-z-10 after:bg-neutral-800 after:rounded-xl group active:scale-95 after:transform after:translate-x-1 after:translate-y-1 h-11"
            :to="`/user/${address}/activity`"
          >
            <span
              class="flex items-center justify-center w-full px-8 py-3 space-x-2 text-white transition duration-200 transform border-2 ease-out-circ rounded-xl group-hover:translate-x-1 group-hover:translate-y-1 bg-blueish border-neutral-800"
              ><SwitchVerticalIcon class="w-5 h-5"></SwitchVerticalIcon>
              <span class="font-semibold tracking-wider uppercase"
                >My activity</span
              ></span
            >
          </router-link>
        </li>
      </ul>

      <form class="mt-12" action="" method="POST">
        <label
          for="email"
          class="ml-2 text-xs font-semibold transition-all duration-200 text-neutral-100"
          >Resend order confirmation</label
        >
        <div class="relative">
          <input
            v-model="emailAddress"
            id="email"
            name="email"
            type="email"
            class="w-full px-4 pr-20 transition-all duration-100 border-none h-11 placeholder:text-neutral-400 text-neutral-200 focus:ring rounded-xl bg-neutral-800"
            :class="!validEmail ? 'focus:ring-reddish' : 'focus:ring-green-400'"
            placeholder="Email address"
          />
          <button
            v-if="validEmail"
            class="absolute flex items-center h-8 gap-1 px-2 py-1 my-auto mb-1 text-xs top-1.5 right-1.5 rounded-lg bg-yellowish text-neutral-800 font-semibold tracking-wider uppercase"
            type="submit"
            @click.prevent="registerForEventTicket()"
          >
            <PaperAirplaneIcon
              class="w-4 h-4 transform rotate-45 -translate-y-0.5"
            />
            Send
          </button>
        </div>
      </form>

      <AppButton
        @clicked="
          () => {
            $emit('update:modelValue', false);
            signOut();
          }
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
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { SwitchVerticalIcon } from "@heroicons/vue/solid";
import {
  CollectionIcon,
  ClipboardCopyIcon,
  ExternalLinkIcon,
  PaperAirplaneIcon,
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
import { authInterface } from "@/services/AuthInterface";

defineEmits(["update:modelValue", "clicked"]);

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

const usdBalance = computed<string>(() => {
  if (balance.value && maticPrice.value) {
    return (Number(balance.value) * Number(maticPrice.value)).toFixed(2);
  }
  return "0.00";
});

const validEmail = computed<boolean>(() =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailAddress.value
  )
);

const registerForEventTicket = async () => {
  await authInterface.sendMail(emailAddress.value);
};

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

<style>
/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: #e5e5e5;
  -webkit-box-shadow: 0 0 0px 1000px #262626 inset;
  box-shadow: 0 0 0px 1000px #262626 inset;
  transition: background-color 5000s ease-in-out 0s;
  color: #e5e5e5;
}
</style>
