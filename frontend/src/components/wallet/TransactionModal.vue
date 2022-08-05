<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    title="Confirm transaction"
  >
    <div class="flex flex-col w-full space-y-4 items-center">
      <div>
        <AppLoadingSpinner size="sm" />
      </div>

      <div>
        <p>You'll be asked to approve the transaction from your wallet</p>
      </div>

      <div
        class="shadow-default border border-black self-stretch"
        v-if="task || price"
      >
        <div
          class="rounded text-sm flex items-start justify-between p-4 dark:bg-neutral-900 bg-white"
        >
          <div>
            <div v-if="task">
              <h3 class="font-bold">{{ task }}</h3>
            </div>
            <div class="flex items-center space-x-2" v-if="price">
              <span class="inline-flex items-center space-x-0.5">
                <PolygonIcon class="block w-4 h-4" />
                <span class="block">{{ Number(price).toFixed(2) }} </span>
              </span>

              <span> ($ {{ usdBalance }} USD) </span>
            </div>
          </div>
        </div>
      </div>

      <slot />
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/app/AppModal.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import PolygonIcon from "@/components/icons/PolygonIcon.vue";
import { computed, ref } from "vue";
import { useFetch } from "@vueuse/core";
import CONFIG from "../../../../config";
import { getTokenHourData } from "@/services/graphql/types";

defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  task: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
});

const maticPrice = ref<string | null>(null);

const usdBalance = computed<string>(() => {
  return props.price && maticPrice.value
    ? (Number(props.price) * Number(maticPrice.value)).toFixed(2)
    : "0.00";
});

const { data, onFetchResponse } = useFetch(CONFIG.subgraph.uniswapPolygon, {
  timeout: 10000,
})
  .post(
    JSON.stringify({
      query: getTokenHourData,
    })
  )
  .json();

onFetchResponse(() => {
  if (data?.value?.data?.tokenHourDatas?.length) {
    maticPrice.value = data.value.data.tokenHourDatas[0].close;
  }
});
</script>
