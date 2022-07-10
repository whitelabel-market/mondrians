<template>
  <div
    class="w-full"
    :class="
      slider &&
      (dense
        ? 'w-full overflow-hidden -mb-[calc(0.1_*_2rem)]'
        : 'overflow-hidden -mb-[calc(0.1_*_2rem)]')
    "
  >
    <div
      class="grid w-full"
      :class="
        dense
          ? slider
            ? 'gap-2 grid-cols-[0.5rem] auto-cols-[calc(50%_-_0.5rem)] lg:auto-cols-[calc(33.33%_-_0.5rem)] pb-8 -mb-8 pr-8 grid-flow-col before:block overflow-x-auto snap-x snap-proximity'
            : 'gap-4 grid-cols-2 lg:grid-cols-3'
          : slider
          ? 'gap-4 grid-cols-[1rem] auto-cols-[calc(100%_-_1rem)] sm:auto-cols-[calc(50%_-_1rem)] lgs:auto-cols-[calc(33.33%_-_1rem)] xl:auto-cols-[calc(25%_-_1rem)] 2xl:auto-cols-[calc(20%_-_1rem)] pb-[calc(0.75_*_2rem)] -mb-[calc(0.75_*_2rem)] pr-8 grid-flow-col before:block overflow-x-auto snap-x snap-proximity'
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

defineProps({
  tokens: {
    type: Array,
    required: true,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  slider: {
    type: Boolean,
    default: false,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
});
</script>
