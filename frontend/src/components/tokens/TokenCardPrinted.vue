<template>
  <div
    class="relative z-10 transition-colors duration-300 after:block after:absolute after:bottom-0 after:right-0 after:w-full after:h-full after:border-neutral-800 after:-z-10 after:bg-neutral-800 dark:after:bg-black after:rounded-xl after:translate-x-1 after:translate-y-1 after:transition-colors after:duration-300"
  >
    <div
      class="flex flex-col justify-between h-full gap-4 transition-all duration-300 border select-none bg-neutral-50 dark:bg-neutral-800 rounded-xl bg-hero-pattern-token dark:bg-dark-hero-pattern-token"
      :class="[
        dense ? 'p-2' : 'p-4',
        highlight ? 'border-black dark:border-white' : 'border-neutral-800',
      ]"
    >
      <div class="flex items-center justify-between" v-if="!dense">
        <div class="flex justify-end -space-x-6">
          <AppButton
            rounded="full"
            size="xs"
            color="blank"
            tooltip="View on opensea"
            flat
            onlyIcon
            class="duration-100 ease-out hover:-translate-y-1 hover:z-50"
            :href="`${OPENSEA_BASE_URL}/${token.id}`"
          >
            <img
              src="@/assets/images/pattern-1.png"
              class="rounded-full"
              :alt="'Token Background Pattern ' + token.id"
              loading="lazy"
            />
          </AppButton>
          <AppButton
            rounded="full"
            size="xs"
            color="blank"
            tooltip="View on polygonscan"
            flat
            onlyIcon
            class="duration-100 ease-out translate-x-4 hover:-translate-y-1 hover:z-50"
            :href="`${EXPLORER_BASE_URL}address/${token.owner.id}`"
          >
            <img
              :src="makeBlockie(token.owner.id)"
              :alt="token.owner.id"
              class="rounded-full"
              loading="lazy"
            />
          </AppButton>
        </div>
        <PolygonAlternative class="w-6 h-6 rounded-full" />
      </div>
      <div
        class="relative flex items-center justify-center w-full group aspect-square"
      >
        <AppImageLoad size="md">
          <template v-slot:image>
            <a class="block cursor-pointer" :href="getIpfsLink" target="_blank">
              <img :src="getIpfsLink" :alt="'Magic Mondrian ' + token.id" />
            </a>
          </template>
        </AppImageLoad>
      </div>
      <div
        class="flex transition-colors duration-300 text-neutral-900 dark:text-neutral-200"
        :class="
          dense ? 'flex-col justify-start ' : 'items-center justify-between'
        "
      >
        <span class="font-bold truncate">&laquo; Magic Mondrian &raquo; </span>
        <span class="font-bold truncate"
          >#{{ ("0000" + token.id).substr(token.id.toString().length) }}
        </span>
      </div>
      <div
        v-if="!dense"
        class="flex items-end justify-between transition-colors duration-300 text-neutral-900 dark:text-neutral-200"
      >
        <div class="flex flex-col items-start">
          <span class="font-medium leading-tight uppercase text-xxs"
            >1000 versions only</span
          >
          <span class="font-medium leading-tight uppercase text-xxs">{{
            mintDate
          }}</span>
          <span class="font-extrabold leading-tight uppercase text-xxs"
            >Serie 1</span
          >
        </div>
        <g v-html="qrCode" class="block w-16 aspect-square" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AppImageLoad from "@/components/app/AppImageLoad.vue";
import AppButton from "@/components/app/AppButton.vue";
import PolygonAlternative from "@/components/icons/PolygonAlternative.vue";
import makeBlockie from "ethereum-blockies-base64";
import {
  EXPLORER_BASE_URL,
  IPFS_BASE_URL,
  months,
  OPENSEA_BASE_URL,
} from "@/utils/constants";
import QRCode from "qrcode";

const props = defineProps({
  token: {
    type: Object,
    required: true,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
});

// link handling

const getIpfsLink = computed(
  () => `${IPFS_BASE_URL}${props.token.imageURI.replace("ipfs://", "")}`
);

// qr code handling

const qrCode = ref("");
//const is = ref();

onMounted(async () => {
  // qrCode.value = await QRCode.toDataURL(
  //   `${OPENSEA_BASE_URL}/${props.token.id}`,
  //   { type: "svg" }
  // );
  QRCode.toString(
    `${OPENSEA_BASE_URL}/${props.token.id}`,
    { type: "svg" },
    function (err: any, string: string) {
      if (err) throw err;
      qrCode.value = string;
    }
  );
});

// date handling for token card
const mintDate = computed(() => {
  const date = new Date(props.token.createdAtTimestamp * 1000);
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${month} ${year}`;
});
</script>
