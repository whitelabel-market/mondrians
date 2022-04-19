<template>
  <div class="flex flex-col items-center space-y-4">
    <div
      class="flex items-center w-full"
      :class="tokens.length > 1 ? 'justify-between' : 'justify-center'"
    >
      <ChevronLeftIcon
        role="button"
        class="w-6 h-6 text-gray-500 transition-all duration-100 active:scale-95"
        :class="
          currentToken === 0
            ? 'cursor-not-allowed hover:text-gray-500'
            : 'cursor-pointer hover:text-gray-900'
        "
        v-if="tokens.length > 1"
        @click.prevent="prev"
      />
      <div
        class="flex items-center w-64 mx-auto overflow-hidden aspect-square"
        v-if="tokens.length > 0"
      >
        <CarouselItem
          v-for="(token, index) in tokens"
          :key="token.id"
          :token="token"
          :index="index"
          :currentToken="currentToken"
        />
      </div>
      <ChevronLeftIcon
        role="button"
        class="w-6 h-6 text-gray-500 transition-all duration-100 transform rotate-180 cursor-pointer hover:text-gray-900 active:scale-95"
        :class="
          currentToken === tokens.length - 1
            ? 'cursor-not-allowed hover:text-gray-500'
            : 'cursor-pointer hover:text-gray-900'
        "
        v-if="tokens.length > 1"
        @click.prevent="next"
      />
    </div>
    <span class="max-w-xs leading-tight text-center text-md"
      ><span class="font-semibold">Congratulations!</span> Your Mondrian #{{
        tokens[currentToken].id
      }}
      was successfully created.</span
    >
    <AppButton
      :size="'sm'"
      :href="`https://ropsten.etherscan.io/tx/${tokens[currentToken].transactionHash}`"
      target="_blank"
      >View transaction on Etherscan</AppButton
    >
    <AppButton
      :color="'secondary'"
      :size="'sm'"
      @click.prevent="$emit('update:modelValue', false)"
      >Close</AppButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import AppButton from "@/components/app/AppButton.vue";
import CarouselItem from "@/components/carousel/CarouselItem.vue";

export default defineComponent({
  components: {
    ChevronLeftIcon,
    AppButton,
    CarouselItem,
  },
  props: {
    tokens: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const currentToken = ref(0);

    const prev = () => {
      currentToken.value -= 1;
    };

    const next = () => {
      currentToken.value += 1;
    };

    return { currentToken, prev, next };
  },
});
</script>
