<template>
  <div class="pb-1 pr-1">
    <div class="z-10 shadow-default">
      <div
        class="flex flex-col justify-between h-full gap-4 transition-all duration-200 border rounded select-none bg-neutral-50 dark:bg-neutral-800 bg-hero-pattern-token dark:bg-dark-hero-pattern-token"
        :class="[
          dense ? 'p-2' : 'p-4',
          highlight
            ? 'border-black dark:border-white transition-all duration-200'
            : 'border-neutral-800 transition-all duration-200',
        ]"
      >
        <div class="flex items-center justify-between" v-if="!dense">
          <div class="flex justify-end -space-x-6">
            <MamoButton
              rounded="full"
              size="xs"
              color="blank"
              tooltip="View on Opensea"
              flat
              onlyIcon
              class="duration-100 ease-out hover:-translate-y-1 hover:z-50"
              :href="`${CONFIG.openseaBaseUrl}/${token.id}`"
            >
              <img
                src="@/assets/images/pattern-1.png"
                class="rounded-full"
                :alt="'Token Background Pattern ' + token.id"
                loading="lazy"
              />
            </MamoButton>
            <MamoButton
              rounded="full"
              size="xs"
              color="blank"
              tooltip="View on polygonscan"
              flat
              onlyIcon
              class="duration-100 ease-out translate-x-4 hover:-translate-y-1 hover:z-50"
              :href="`${CONFIG.explorerBaseUrl}address/${token.owner.id}`"
            >
              <img
                :src="makeBlockie(token.owner.id)"
                :alt="token.owner.id"
                class="rounded-full"
                loading="lazy"
              />
            </MamoButton>
          </div>
          <PolygonAlternativeIcon class="w-8 h-8 rounded-full" />
        </div>
        <div
          class="relative flex items-center justify-center w-full group aspect-square"
        >
          <a
            class="block w-full aspect-square"
            :href="getIpfsLink"
            target="_blank"
          >
            <object
              v-if="svg"
              v-html="svg"
              id="mondrian"
              width="100%"
              height="100%"
            ></object>
            <!-- <img :src="getIpfsLink" :alt="'Magic Mondrian ' + token.id" /> -->
          </a>
        </div>
        <div
          class="flex transition-colors duration-200 text-neutral-900 dark:text-neutral-200"
          :class="
            dense ? 'flex-col justify-start ' : 'items-center justify-between'
          "
        >
          <span class="font-bold truncate"
            >&laquo; Magic Mondrian &raquo;
          </span>
          <span class="font-bold truncate"
            >#{{ ("0000" + token.id).substr(token.id.toString().length) }}
          </span>
        </div>
        <div
          v-if="!dense"
          class="flex items-end justify-between transition-colors duration-200 text-neutral-900 dark:text-neutral-200"
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
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MamoButton } from "@/components/Button";
import { PolygonAlternativeIcon } from "@/components/Icon";
import makeBlockie from "ethereum-blockies-base64";
import { months } from "@/utils/constants";
import CONFIG from "../../../../../config";
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
  () => `${CONFIG.ipfsBaseUrl}${props.token.imageURI.replace("ipfs://", "")}`
);

// qr code handling

const qrCode = ref("");
const svg = ref();

onMounted(async () => {
  // qrCode.value = await QRCode.toDataURL(
  //   `${CONFIG.openseaBaseUrl}/${props.token.id}`,
  //   { type: "svg" }
  // );
  const data = await fetch(
    `${CONFIG.ipfsBaseUrl}${props.token.imageURI.replace("ipfs://", "")}`
  );
  svg.value = (await data.text())
    .replace(new RegExp(`width="[0-9]*px"`, "g"), `width="100%"`)
    .replace(new RegExp(`height="[0-9]*px"`, "g"), `height="100%"`);
  QRCode.toString(
    `${CONFIG.openseaBaseUrl}/${props.token.id}`,
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
<style>
* {
  shape-rendering: crispEdges;
}
</style>
