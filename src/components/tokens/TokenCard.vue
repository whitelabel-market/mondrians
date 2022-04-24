<template>
  <div class="flex flex-col justify-between h-full gap-3 p-4 select-none">
    <div class="relative flex items-center justify-between">
      <dd
        class="flex justify-end -space-x-6 sm:justify-start lg:justify-end xl:justify-start"
      >
        <AppTooltip
          class="mr-4 duration-100 ease-out transform hover:-translate-y-1 hover:z-50"
          :show="hoverCollection"
          :delay="500"
        >
          <template v-slot:element
            ><AppImageLoad>
              <template v-slot:image>
                <a
                  :href="`https://testnets.opensea.io/assets/${token.contract.id}/${token.id}`"
                  target="_blank"
                >
                  <img
                    src="../../assets/images/pattern-1.png"
                    class="w-6 h-6 rounded-full hover:cursor-pointer"
                    loading="lazy"
                    @mouseenter="hoverCollection = true"
                    @mouseleave="hoverCollection = false"
                /></a>
              </template>
              <template v-slot:preloader>
                <AppLoadingSpinner :size="'md'" />
              </template> </AppImageLoad
          ></template>
          <template #text>View on opensea</template>
        </AppTooltip>
        <AppTooltip
          class="mr-4 duration-100 ease-out transform hover:-translate-y-1 hover:z-50"
          :show="hoverOwner"
          :delay="500"
        >
          <template v-slot:element
            ><AppImageLoad>
              <template v-slot:image>
                <a
                  :href="`https://etherscan.io/address/${token.owner.id}`"
                  target="_blank"
                >
                  <img
                    :src="makeBlockie(token.owner.id)"
                    class="w-6 h-6 rounded-full hover:cursor-pointer"
                    loading="lazy"
                    @mouseenter="hoverOwner = true"
                    @mouseleave="hoverOwner = false"
                /></a>
              </template>
              <template v-slot:preloader>
                <AppLoadingSpinner :size="'md'" />
              </template> </AppImageLoad
          ></template>
          <template #text>View on etherscan</template>
        </AppTooltip>
      </dd>
      <AppMenu :token="token" />
    </div>
    <div class="flex items-center justify-center w-full aspect-square">
      <AppImageLoad>
        <template v-slot:image>
          <img
            :src="`https://ipfs.io/ipfs/${token.imageURI.replace(
              'ipfs://',
              ''
            )}`"
          />
        </template>
        <template v-slot:preloader>
          <AppLoadingSpinner :size="'md'" />
        </template>
      </AppImageLoad>
    </div>
    <div class="flex items-center justify-between">
      <span class="font-semibold text-gray-900 truncate"
        >#{{ ("00" + token.id).substr(token.id.toString().length) }}
      </span>
      <div class="p-1 rounded-full bg-gray-50">
        <EthereumIcon class="w-4 h-4 inset-1/2" />
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
        <span
          class="text-xs font-semibold text-transparent truncate bg-clip-text bg-gradient-to-r to-cyan-500 from-blueish"
          >0.25
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppImageLoad from "@/components/app/AppImageLoad.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import AppTooltip from "@/components/app/AppTooltip.vue";
import AppMenu from "@/components/app/AppMenu.vue";
import EthereumIcon from "@/components/icons/EthereumIcon.vue";
import makeBlockie from "ethereum-blockies-base64";

defineProps({
  token: {
    type: Object,
    required: true,
  },
});
const hoverCollection = ref(false);
const hoverOwner = ref(false);
</script>
