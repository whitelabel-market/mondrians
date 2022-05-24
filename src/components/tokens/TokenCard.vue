<template>
  <div
    class="relative after:block after:absolute after:bottom-0 after:right-0 after:w-full after:h-full after:border-black after:-z-10 after:bg-black after:rounded-xl after:translate-x-1 after:translate-y-1"
  >
    <div
      class="flex flex-col justify-between h-full gap-4 p-4 bg-white border border-black select-none rounded-xl bg-hero-pattern-token"
    >
      <div class="flex items-center justify-between">
        <dd class="flex justify-end -space-x-6">
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
              src="../../assets/images/pattern-1.png"
              class="rounded-full"
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
            class="translate-x-4 duration-100 ease-out hover:-translate-y-1 hover:z-50"
            :href="`${EXPLORER_BASE_URL}address/${token.owner.id}`"
          >
            <img
              :src="makeBlockie(token.owner.id)"
              class="rounded-full"
              loading="lazy"
            />
          </AppButton>
        </dd>
        <PolygonAlternative class="w-6 h-6 rounded-full" />
      </div>
      <div
        class="group relative flex items-center justify-center w-full aspect-square cursor-pointer"
      >
        <AppImageLoad size="md">
          <template v-slot:image>
            <a :href="getIpfsLink" target="_blank">
              <img :src="getIpfsLink" :alt="'Magic Mondrian ' + token.id" />
            </a>
          </template>
        </AppImageLoad>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-bold text-gray-900 truncate"
          >&laquo; Magic Mondrian &raquo;
        </span>
        <span class="font-bold text-gray-900 truncate"
          >#{{ ("0000" + token.id).substr(token.id.toString().length) }}
        </span>
      </div>
      <div class="flex items-end justify-between">
        <div class="flex flex-col items-start">
          <span class="font-medium leading-tight uppercase text-xxs"
            >1000 versions only</span
          >
          <span class="font-medium leading-tight uppercase text-xxs">{{
            months[getDate.getUTCMonth()] + " " + getDate.getUTCFullYear()
          }}</span>
          <span class="font-extrabold leading-tight uppercase text-xxs"
            >Serie 1</span
          >
        </div>
        <div class="flex items-end gap-2">
          <img
            :src="qrCode"
            class="w-16 h-16 translate-x-1 translate-y-1"
            alt="QR Code"
          />
        </div>
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
  OPENSEA_BASE_URL,
} from "@/utils/constants";
import QRCode from "qrcode";

const props = defineProps({
  token: {
    type: Object,
    required: true,
  },
});

// link handling

const getIpfsLink = computed(
  () => `${IPFS_BASE_URL}${props.token.imageURI.replace("ipfs://", "")}`
);

// qr code handling

const qrCode = ref("");

onMounted(async () => {
  qrCode.value = await QRCode.toDataURL(
    `${OPENSEA_BASE_URL}/${props.token.id}`
  );
});

// date handling for token card

const getDate = computed<Date>(
  () => new Date(props.token.createdAtTimestamp * 1000)
);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
</script>
