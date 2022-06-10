<template>
  <div class="lgs:ml-8 mt-6 lgs:mt-0 lgs:max-w-[454px]">
    <div
      class="mx-auto text-5xl font-black text-center text-transparent md:text-6xl"
    >
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-blueish via-yellowish to-reddish"
      >
        <span>
          {{ whitelistEnabled ? "Whitelist Sale" : "Public Sale" }} is live
        </span>
      </span>
    </div>
    <p
      class="mt-2 text-2xl font-bold text-center transition-colors duration-300 md:text-3xl md:mt-4 dark:text-neutral-200"
    >
      {{ contract.totalSupply }} of {{ contract.maxSupply }}
    </p>
    <div class="flex items-center justify-center w-full mt-4 space-x-4">
      <AppButton
        only-icon
        :disabled="!canDecrease"
        size="md"
        @click.prevent="$emit('decrease')"
        rounded="full"
      >
        <MinusSmIcon class="w-4 h-4" />
      </AppButton>

      <input
        :value="quantity"
        readonly
        type="text"
        id="mint"
        name="mint"
        class="block w-20 mx-auto text-center transition-colors duration-300 border-2 rounded-full outline-none cursor-not-allowed border-neutral-800 dark:text-neutral-200 dark:bg-neutral-800 dark:border-neutral-800 focus:outline-none"
        :placeholder="quantity.toString()"
      />

      <AppButton
        only-icon
        :disabled="!canIncrease"
        @click.prevent="$emit('increase')"
        rounded="full"
      >
        <PlusSmIcon class="w-4 h-4" />
      </AppButton>
    </div>
    <p
      class="flex items-center justify-center mt-4 space-x-1 text-sm font-semibold transition-colors duration-300 dark:text-neutral-200"
    >
      <span>Price: {{ Number(price) * quantity }} </span>
      <PolygonIcon class="w-2.5" />
    </p>
    <div class="flex items-center justify-center mt-4">
      <AppButton
        :disabled="quantity === 0"
        @click.prevent="
          !isConnected ? showConnectModal() : $emit('update:modelValue', true)
        "
      >
        <span class="px-8"> Mint </span>
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PolygonIcon from "../icons/PolygonIcon.vue";
import AppButton from "@/components/app/AppButton.vue";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/vue/solid";
import { computed, ref, watch } from "vue";

const emit = defineEmits([
  "increase",
  "decrease",
  "update:modelValue",
  "update:showConnectModal",
]);

const props = defineProps({
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  whitelistEnabled: {
    type: Boolean,
    required: true,
  },
  publicsaleEnabled: {
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
});

const fromMintButton = ref(false);

const canDecrease = computed(() => props.quantity > 0);
const canIncrease = computed(
  () => props.quantity < (props.whitelistEnabled ? 5 : 10)
);

const showConnectModal = () => {
  emit("update:showConnectModal", true);
  fromMintButton.value = true;
};

watch([fromMintButton, () => props.isConnected], () => {
  if (fromMintButton.value === true && props.isConnected) {
    emit("update:modelValue", true);
    fromMintButton.value = false;
  }
});
</script>
