<template>
  <div class="flex flex-col justify-between h-full gap-3 p-4">
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
    <div class="flex items-center mt-4">
      <span class="font-semibold text-gray-900 truncate">Eins </span>
    </div>
    <div class="flex items-start mt-2">
      <span class="h-full text-sm text-gray-500 line-clamp-3">cool </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppImageLoad from "@/components/app/AppImageLoad.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import AppTooltip from "@/components/app/AppTooltip.vue";
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
