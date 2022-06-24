<template>
  <div class="w-full">
    <div
      class="grid w-full"
      :class="
        dense
          ? 'gap-4 grid-cols-2 lg:grid-cols-3'
          : 'gap-8 grid-cols-1 sm:grid-cols-2 lgs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      "
    >
      <template v-if="!isFinished">
        <div class="w-full" v-for="i of dense ? 3 : 5" :key="i">
          <TokenCardSkeleton :dense="dense" />
        </div>
      </template>

      <template v-else-if="tokens.length">
        <div class="w-full" v-for="token of tokens" :key="token.id">
          <slot name="token" :token="token">
            <TokenCard :dense="dense" :token="token" />
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import TokenCard from "@/components/tokens/TokenCard.vue";
import TokenCardSkeleton from "@/components/tokens/TokenCardSkeleton.vue";
import { computed } from "vue";

const props = defineProps({
  tokens: {
    type: Array,
    required: true,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  enableSlider: {
    type: Boolean,
    default: false,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
});
</script>
