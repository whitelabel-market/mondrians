<template>
  <div class="lgs:ml-8 mt-6 lgs:mt-0 lgs:max-w-[454px]">
    <div
      class="font-bold md:text-[4.406rem] text-5xl italic relative z-10 text-center"
    >
      {{
        contract.phase === "WhitelistSale" ? "Whitelist Sale" : "Public Sale"
      }}
      is live
      <span
        class="text-yellowish w-full font-normal tracking-[0.2em] lgs:tracking-[0.1em] text-center font-serif absolute lgs:left-0 left-1/2 lgs:translate-x-0 -translate-x-1/2 top-0 -z-10"
        >{{
          contract.phase === "WhitelistSale" ? "Whitelist Sale" : "Public Sale"
        }}
        is live</span
      >
    </div>
    <p class="mt-2 font-bold text-center md:text-3xl md:mt-4">
      {{ contract.totalSupply }} of {{ contract.maxSupply }}
    </p>
    <div class="flex items-center justify-center w-full mt-4 space-x-4">
      <button
        class="w-10 h-10 transition-all duration-200 ease-in-out transform rounded-full active:scale-95"
        :class="
          canDecrease
            ? 'bg-yellowish ease-in text-gray-900'
            : 'bg-gray-200 ease-out text-gray-400 cursor-not-allowed'
        "
        @click.prevent="$emit('decrease')"
        :disabled="!canDecrease"
      >
        -
      </button>
      <input
        :value="quantity"
        readonly
        type="text"
        name="mint"
        id="mint"
        class="block w-20 mx-auto text-center placeholder-gray-500 border-2 border-gray-700 rounded-full cursor-not-allowed focus:outline-none"
        :placeholder="quantity.toString()"
      />
      <button
        class="w-10 h-10 transition-all duration-200 ease-in-out transform rounded-full active:scale-95"
        :class="
          canIncrease
            ? 'bg-yellowish ease-in text-gray-900'
            : 'bg-gray-200 ease-out text-gray-400 cursor-not-allowed'
        "
        @click.prevent="$emit('increase')"
        :disabled="!canIncrease"
      >
        +
      </button>
    </div>
    <p
      class="flex items-center justify-center mt-4 space-x-1 text-sm font-semibold"
    >
      <span>Price: {{ price * quantity }} </span>
      <EthereumIcon class="w-2.5" />
    </p>
    <div class="flex items-center justify-center mt-4">
      <AppButton
        :size="'md'"
        :disabled="quantity === 0 || !isConnected"
        :fullWidth="false"
        @click.prevent="$emit('update:modelValue', true), $emit('doMint')"
      >
        Mint
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EthereumIcon from "../icons/EthereumIcon.vue";
import AppButton from "@/components/app/AppButton.vue";

export default defineComponent({
  components: {
    EthereumIcon,
    AppButton,
  },
  props: {
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    canDecrease: {
      type: Boolean,
      required: true,
    },
    canIncrease: {
      type: Boolean,
      required: true,
    },
    contract: {
      type: Object,
      required: true,
    },
    isConnected: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
