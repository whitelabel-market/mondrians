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
          class="object-cover w-8 h-8 rounded-lg"
        />
        <div>
          <h4
            class="block font-serif text-xl font-black md:text-2xl slashed-zero leading-0"
          >
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

      <ul class="flex flex-col w-full space-y-2">
        <li>
          <AppButton
            full-width
            color="gray"
            size="xs"
            :to="`/mint`"
            @click.prevent="$emit('update:modelValue', false)"
            ><ViewGridAddIcon class="w-5 h-5" />
            <span class="block">Create</span>
          </AppButton>
        </li>
        <li>
          <AppButton
            full-width
            color="gray"
            size="xs"
            :to="`/user/${address}/collected`"
            @click.prevent="$emit('update:modelValue', false)"
            ><CollectionIcon class="w-5 h-5"></CollectionIcon>
            <span class="block">My Collection</span>
          </AppButton>
        </li>
        <li>
          <AppButton
            full-width
            color="gray"
            size="xs"
            :to="`/user/${address}/activity`"
            @click.prevent="$emit('update:modelValue', false)"
            ><SwitchVerticalIcon class="w-5 h-5" />
            <span class="block">My activity</span>
          </AppButton>
        </li>
      </ul>

      <form>
        <AppInput
          v-model="emailAddress"
          id="user-modal-ticket-email"
          label="Resend order confirmation"
          type="email"
          placeholder="Email address"
          :inline-submit="validEmail"
          @submit="registerForEventTicket"
        >
          <PaperAirplaneIcon
            class="w-4 h-4 transform rotate-45 -translate-y-0.5"
          />
          <span
            class="text-xs font-semibold text-neutral-900 dark:text-neutral-400"
            >Send</span
          >
        </AppInput>
      </form>

      <div
        class="flex flex-col p-4 space-y-2 bg-white border-2 rounded-lg dark:bg-neutral-900 border-stone-200 dark:border-stone-700"
      >
        <div class="flex items-start justify-between w-full">
          <div>
            <div class="flex items-center space-x-2">
              <img
                :src="makeBlockie(address)"
                :alt="address"
                class="object-cover w-4 h-4 rounded"
              />
              <div>
                <h4 class="block text-sm slashed-zero">
                  {{ privateAddress }}
                </h4>
              </div>
            </div>

            <span class="text-xs"> Network: Polygon </span>
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

        <div class="flex items-center pb-2 space-x-1">
          <PolygonIcon class="block w-4 h-4" />
          <span class="block font-semibold"
            >{{ Number(balance).toFixed(2) }} ($ {{ usdBalance }})</span
          >
        </div>

        <div>
          <AppButton
            size="xs"
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
import AppTooltip from "@/components/app/AppTooltip.vue";
import AppButton from "@/components/app/AppButton.vue";
import PolygonIcon from "@/components/icons/PolygonIcon.vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import {
  CollectionIcon,
  ClipboardCopyIcon,
  SearchIcon,
  SwitchVerticalIcon,
  PaperAirplaneIcon,
  ViewGridAddIcon,
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
import { authInterface } from "@/services/BackendInterface";
import TicketForm from "@/components/ticket/TicketForm.vue";
import AppInput from "@/components/app/AppInput.vue";

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
