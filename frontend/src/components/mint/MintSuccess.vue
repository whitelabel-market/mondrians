<template>
  <div class="flex flex-col items-center space-y-4">
    <div
      class="flex items-center w-full text-neutral-800 dark:text-neutral-200"
      :class="tokens.length > 1 ? 'justify-between' : 'justify-center'"
    >
      <ChevronLeftIcon
        role="button"
        class="w-6 h-6 transition-all duration-100 text-neutral-400 active:scale-95"
        :class="
          currentToken === 0
            ? 'cursor-not-allowed hover:text-neutral-400'
            : 'cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-200'
        "
        v-if="tokens.length > 1"
        @click.prevent="prev"
      />
      <div
        class="flex items-center justify-center w-64 mx-auto overflow-hidden aspect-square"
        v-if="tokens.length > 0"
      >
        <CarouselItem
          v-for="(token, index) in (tokens as Token[])"
          :key="token.id"
          :token="token"
          :index="index"
          :currentToken="currentToken"
        />
      </div>
      <ChevronLeftIcon
        role="button"
        class="w-6 h-6 transition-all duration-100 transform rotate-180 cursor-pointer text-neutral-400 active:scale-95"
        :class="
          currentToken === tokens.length - 1
            ? 'cursor-not-allowed hover:text-neutral-400'
            : 'cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-200'
        "
        v-if="tokens.length > 1"
        @click.prevent="next"
      />
    </div>
    <span
      class="max-w-xs leading-tight text-center text-md text-neutral-800 dark:text-neutral-200"
      ><span class="font-semibold">Congratulations!</span> Your Magic Mondrian
      #{{
        (tokens[currentToken] as Token).id
      }}
      was successfully created.</span
    >
    <span
      class="max-w-xs font-bold leading-tight text-center text-md text-neutral-800 dark:text-neutral-200"
      >Let's show-off a little!</span
    >
    <div class="flex items-center gap-2">
      <ShareButtons :address="address" />
    </div>
    <AppButton
      :href="`${EXPLORER_BASE_URL}tx/${(tokens[currentToken] as Token).transactionHash}`"
      :fullWidth="true"
      target="_blank"
      >View on Polygonscan</AppButton
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import AppButton from "@/components/app/AppButton.vue";
import CarouselItem from "@/components/carousel/CarouselItem.vue";
import { EXPLORER_BASE_URL } from "@/utils/constants";
import ShareButtons from "@/components/share/ShareButtons.vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import type { Token } from "@/utils/types";

const { address } = useWallet();

defineProps({
  tokens: {
    type: Array,
    required: true,
  },
});

const currentToken = ref(0);

const prev = () => {
  currentToken.value -= 1;
};

const next = () => {
  currentToken.value += 1;
};
</script>
