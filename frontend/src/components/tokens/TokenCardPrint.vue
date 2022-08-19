<template>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 535"
    class="aspect-[3/4] h-full w-full bg-white rounded"
  >
    <foreignObject width="100%" height="100%">
      <div
        class="flex flex-col h-full w-full relative p-[5.5%] !bg-white !text-black"
      >
        <div
          class="relative flex items-center justify-center w-full group aspect-square"
          v-if="token?.id || tokenId"
        >
          <object
            v-if="svg"
            v-html="svg"
            id="mondrian"
            width="100%"
            height="100%"
          ></object>
          <div
            v-else
            class="w-[10%] h-[10%] border-2 rounded-full spinner border-r-black"
          ></div>
        </div>

        <div class="font-sans flex justify-between mt-[3%]">
          <div class="flex flex-col space-y-[1.5%]">
            <div
              class="font-black italic uppercase truncate text-[140%] leading-none"
            >
              <h4 v-if="token?.id || tokenId" class="font-sans">
                Magic Mondrian #{{
                  ("0000" + (token?.id || tokenId)).substr(
                    (token?.id || tokenId).toString().length
                  )
                }}
              </h4>
            </div>
            <div class="w-[58.5%]">
              <ul
                class="flex flex-col leading-tight"
                v-if="token?.id || tokenId"
              >
                <li
                  class="flex w-full items-center justify-between text-[90%] uppercase whitespace-nowrap"
                  v-for="(value, key) in tokenDetails"
                  :key="key"
                >
                  <span class="block font-sans font-light">{{ key }}:</span>
                  <span class="block font-sans font-bold text-right">{{
                    value
                  }}</span>
                </li>
              </ul>
            </div>
          </div>
          <img
            :src="qrCode"
            alt=""
            class="aspect-square w-[18%] h-[18%] -translate-y-[5%] translate-x-[8%]"
          />
        </div>

        <div
          class="font-sans h-full grid grid-cols-11 gap-[4%] items-end -mt-[1%]"
        >
          <div class="col-span-5">
            <p
              class="text-[32%] text-neutral-400 font-light w-full leading-none font-sans"
            >
              © 2022 Whitelabel Solutions, Inc. Powered by Piet Mondrian.
            </p>
          </div>

          <div class="flex items-center justify-center col-span-1">
            <svg
              version="1.0"
              id="Ebene_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 32 32"
              style="enable-background: new 0 0 32 32"
              xml:space="preserve"
              alt="Magic Mondrian Logo"
              class="aspect-square w-[100%]"
            >
              <rect x="2" y="2" class="st0" width="13" height="13" />
              <rect x="2" y="17" class="st1" width="13" height="13" />
              <rect x="17" y="2" class="st2" width="13" height="28" />
              <rect x="15" class="st3" width="2" height="32" />
              <rect y="15" class="st3" width="15" height="2" />
              <rect class="st3" width="2" height="32" />
              <rect x="2" y="30" class="st3" width="30" height="2" />
              <rect x="2" class="st3" width="30" height="2" />
              <rect x="30" y="2" class="st3" width="2" height="28" />
            </svg>
          </div>
          <div class="flex items-start col-span-5">
            <p
              class="text-[42%] align-end leading-none font-sans"
              id="description"
            >
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
import { useRoute } from "vue-router";
import CONFIG from "@/../../config";
import QRCode from "qrcode";
import { getShortAddress } from "@/utils/ethereum";
import { useDateFormat, asyncComputed } from "@vueuse/core";

const emits = defineEmits(["loaded"]);

emits("loaded", false);

onMounted(() => {
  emits("loaded", true);
});

const route = useRoute();

const props = defineProps({
  token: {
    type: Object,
  },
});

const { url, timestamp, mintAddress, tokenId } = route.query;

// link handling

const svg = ref();

onMounted(async () => {
  const data = await fetch(
    url
      ? `${CONFIG.ipfsBaseUrl}${(url as string).replace("ipfs://", "")}`
      : `${CONFIG.ipfsBaseUrl}${props?.token?.imageURI.replace("ipfs://", "")}`
  );
  svg.value = (await data.text())
    .replace(new RegExp(`width="[0-9]*px"`, "g"), `width="100%"`)
    .replace(new RegExp(`height="[0-9]*px"`, "g"), `height="100%"`);
});

// qr code handling

const qrCode = asyncComputed(async () => {
  return await QRCode.toDataURL(props?.token?.owner?.id || mintAddress, {
    type: "image/png",
    quality: 1,
    width: 1582.7,
  });
});

const tokenDetails = computed(() => ({
  "Mint Date": useDateFormat(
    props?.token?.createdAtTimestamp * 1000 || timestamp * 1000,
    "MM/DD/YYYY"
  ).value,
  Blockchain: "Polygon",
  Owner: getShortAddress(props?.token?.owner?.id || mintAddress),
}));
</script>

<style>
.st0 {
  fill: #e10e24;
}
.st1 {
  fill: #fadc48;
}
.st2 {
  fill: #4481c3;
}
.st3 {
  fill: #010202;
}
#description {
  text-align: justify;
  hyphens: auto;
}

.spinner {
  position: relative;
  animation: 0.66s linear 0s infinite normal none running loader;
  user-select: none;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
