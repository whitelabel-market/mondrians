<template>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 600"
    preserveAspectRatio="xMinYMin meet"
  >
    <foreignObject width="100%" height="100%">
      <div
        class="flex flex-col space-y-[6%] relative"
        xmlns="http://www.w3.org/1999/xhtml"
      >
        <div class="p-[6%] pb-[0%]">
          <AppImageLoad size="md">
            <template v-slot:image>
              <img :src="imgSrc" :alt="'Magic Mondrian ' + token.id" />
            </template>
          </AppImageLoad>
        </div>

        <div class="flex justify-between space-x-[6%]">
          <div class="flex flex-col space-y-[6%]">
            <div class="font-bold uppercase truncate text-[182%] leading-none">
              <h4>
                Magic Mondrian <br />#{{
                  ("0000" + token.id).substr(token.id.toString().length)
                }}
              </h4>
            </div>
            <div class="w-9/12">
              <ul class="flex flex-col leading-tight">
                <li
                  class="flex w-full items-center justify-between text-[102%] uppercase whitespace-nowrap"
                  v-for="(value, key) in tokenDetails"
                  :key="key"
                >
                  <span class="block font-extralight">{{ key }}:</span>
                  <span class="block font-semibold text-right">{{
                    value
                  }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="transform -translate-y-[5%] flex-1">
            <g v-html="qrCode" class="aspect-square w-full" />
          </div>
        </div>

        <div class="grid grid-cols-7 gap-[4%] items-end">
          <div class="col-span-2">
            <p class="text-[32%] text-neutral-400 font-light w-full">
              © 2022 Whitelabel Solutions, Inc.
            </p>
          </div>

          <div class="col-span-5 flex items-start space-x-[4%]">
            <img
              src="@/assets/images/logo.png"
              alt="Magic Mondrian Logo"
              class="aspect-square w-[6%]"
            />
            <p class="text-[42%]">
              Mondrians is a drop of custom digital paintings, created by Piet
              Mondrian, aiming to express culture, uniqueness and creativity.
              Through size, shape and color Mondrian's embraces what it means to
              be on the common ground but having a sense of uniqueness.
            </p>
          </div>
        </div>
      </div>
    </foreignObject>
  </svg>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AppImageLoad from "@/components/app/AppImageLoad.vue";
import { IPFS_BASE_URL, OPENSEA_BASE_URL } from "@/utils/constants";
import QRCode from "qrcode";
import { getShortAddress } from "@/utils/ethereum";
import { useDateFormat } from "@vueuse/core";

const props = defineProps({
  token: {
    type: Object,
    required: true,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
});

// link handling

const imgSrc = computed(
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

const tokenDetails = computed(() => ({
  "Mint Date": useDateFormat(
    props.token.createdAtTimestamp * 1000,
    "MM/DD/YYYY"
  ).value,
  Blockchain: "Polygon",
  Owner: getShortAddress(props.token.owner.id),
}));
</script>
