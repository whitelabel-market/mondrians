<template>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 600"
    preserveAspectRatio="xMinYMin meet"
    v-if="token"
  >
    <foreignObject width="100%" height="100%">
      <div
        class="flex flex-col relative space-y-[4%] !bg-white !text-black"
        xmlns="http://www.w3.org/1999/xhtml"
      >
        <div class="p-[8%] pb-[4%]">
          <AppImageLoad size="md">
            <template v-slot:image>
              <img :src="imgSrc" :alt="'Magic Mondrian ' + token.id" />
            </template>
          </AppImageLoad>
        </div>

        <div class="flex justify-between space-x-[8%] p-[1%]">
          <div class="flex flex-col space-y-[8%]">
            <div class="font-black uppercase truncate text-[148%] leading-none">
              <h4>
                Magic Mondrian <br />#{{
                  ("0000" + token.id).substr(token.id.toString().length)
                }}
              </h4>
            </div>
            <div class="w-9/12">
              <ul class="flex flex-col leading-tight">
                <li
                  class="flex w-full items-center justify-between text-[84%] uppercase whitespace-nowrap"
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
          <div class="transform flex-1 pl-[12%]">
            <g v-html="qrCode" class="aspect-square w-full !fill-transparent" />
          </div>
        </div>

        <div class="grid grid-cols-7 gap-[4%] p-[1%] items-end">
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
import CONFIG from "@/../../config";
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
  () => `${CONFIG.ipfsBaseUrl}${props.token.imageURI.replace("ipfs://", "")}`
);

// qr code handling

const qrCode = ref("");
//const is = ref();

onMounted(async () => {
  // qrCode.value = await QRCode.toDataURL(
  //   `${CONFIG.openseaBaseUrl}/${props.token.id}`,
  //   { type: "svg" }
  // );
  QRCode.toString(
    `${CONFIG.openseaBaseUrl}/${props.token.id}`,
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
