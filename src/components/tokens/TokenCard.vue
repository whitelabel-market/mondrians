<template>
  <div class="flex flex-col justify-between h-full gap-3 p-4 select-none">
    <div class="relative flex items-center justify-between">
      <dd
        class="flex justify-end -space-x-6 sm:justify-start lg:justify-end xl:justify-start"
      >
        <AppTooltip
          class="mr-4 duration-100 ease-out transform hover:-translate-y-1 hover:z-50"
          :show="hoverCollection"
          delay="500"
        >
          <template v-slot:element
            ><AppImageLoad size="md">
              <template v-slot:image>
                <a
                  class="w-6 h-6"
                  :href="`${OPENSEA_BASE_URL}${token.contract.id}/${token.id}`"
                  target="_blank"
                >
                  <img
                    src="../../assets/images/pattern-1.png"
                    class="w-6 h-6 rounded-full hover:cursor-pointer"
                    loading="lazy"
                    @mouseenter="hoverCollection = true"
                    @mouseleave="hoverCollection = false"
                  />
                </a>
              </template> </AppImageLoad
          ></template>
          <template #text>View on opensea</template>
        </AppTooltip>
        <AppTooltip
          class="mr-4 duration-100 ease-out transform hover:-translate-y-1 hover:z-50"
          :show="hoverOwner"
          delay="500"
        >
          <template v-slot:element
            ><AppImageLoad size="md">
              <template v-slot:image>
                <a
                  :href="`${EXPLORER_BASE_URL}address/${token.owner.id}`"
                  target="_blank"
                >
                  <img
                    :src="makeBlockie(token.owner.id)"
                    class="w-6 h-6 rounded-full hover:cursor-pointer"
                    loading="lazy"
                    @mouseenter="hoverOwner = true"
                    @mouseleave="hoverOwner = false"
                /></a>
              </template> </AppImageLoad
          ></template>
          <template #text>View on Polygonscan</template>
        </AppTooltip>
      </dd>
      <AppMenu :token="token" />
    </div>
    <div class="flex items-center justify-center w-full aspect-square">
      <AppImageLoad size="md">
        <template v-slot:image>
          <img
            :src="`${IPFS_BASE_URL}${token.imageURI.replace('ipfs://', '')}`"
          />
        </template>
      </AppImageLoad>
    </div>
    <div class="flex items-center justify-between">
      <span class="font-semibold text-gray-900 truncate"
        >#{{ ("00" + token.id).substr(token.id.toString().length) }}
      </span>
      <div class="p-1 rounded-full bg-gray-50">
        <PolygonIcon class="w-4 h-4 inset-1/2" />
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <span class="text-xs font-semibold text-gray-500 truncate"
          >Current bid
        </span>
        <span
          class="text-xs font-semibold text-transparent truncate bg-clip-text bg-gradient-to-r from-cyan-500 to-blueish"
          >Current bid
        </span>
      </div>
      <div class="flex flex-col text-right">
        <span class="text-xs font-semibold text-gray-500 truncate"
          >Buy in
        </span>
        <div class="flex items-center">
          <span
            class="text-xs font-semibold text-transparent truncate bg-clip-text bg-gradient-to-r to-cyan-500 from-blueish"
            >{{ 0.25 }}
          </span>
          <PolygonIcon class="w-3 h-3 transform translate-x-0.5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppImageLoad from "@/components/app/AppImageLoad.vue";
import AppTooltip from "@/components/app/AppTooltip.vue";
import AppMenu from "@/components/app/AppMenu.vue";
import PolygonIcon from "@/components/icons/PolygonIcon.vue";
import makeBlockie from "ethereum-blockies-base64";
import {
  EXPLORER_BASE_URL,
  IPFS_BASE_URL,
  OPENSEA_BASE_URL,
} from "@/utils/constants";

defineProps({
  token: {
    type: Object,
    required: true,
  },
});
const hoverCollection = ref(false);
const hoverOwner = ref(false);
</script>
