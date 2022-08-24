<template>
  <div>
    <vue-horizontal v-if="slider">
      <template v-slot:btn-next>
        <div class="pr-1">
          <AppButton only-icon color="gray" rounded="full" size="sm">
            <ChevronRightIcon class="w-6 h-6" />
          </AppButton>
        </div>
      </template>
      <template v-slot:btn-prev>
        <div class="pr-1">
          <AppButton only-icon color="gray" rounded="full" size="sm">
            <ChevronLeftIcon class="w-6 h-6" />
          </AppButton>
        </div>
      </template>

      <div class="w-48 mr-4" v-for="(token, i) of _tokens" :key="i">
        <TokenCardSkeleton v-if="!isFinished" />
        <slot v-else name="token" :token="token">
          <TokenCard :token="token" />
        </slot>
      </div>
    </vue-horizontal>

    <div
      v-else
      class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lgs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <template v-for="(token, i) of _tokens" :key="i">
        <slot v-if="isFinished" name="token" :token="token">
          <TokenCard :token="token" />
        </slot>
        <TokenCardSkeleton v-else />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import TokenCard from "@/components/tokens/TokenCard.vue";
import TokenCardSkeleton from "@/components/tokens/TokenCardSkeleton.vue";
import VueHorizontal from "vue-horizontal";
import AppButton from "@/components/app/AppButton.vue";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/solid";
import { computed } from "vue";
import { Token } from "@/utils/types";

const props = defineProps({
  tokens: {
    type: Array,
    required: true,
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

const _tokens = computed(() =>
  props.isFinished
    ? (props.tokens as Token[])
        .slice()
        .sort((a: Token, b: Token) => Number(a.id) - Number(b.id))
    : 5
);
</script>
