<template>
  <div
    class="flex flex-col items-center mx-auto space-y-8 text-center transition-colors duration-100 flex-0 text-neutral-900 dark:text-neutral-200"
    v-if="error || aborted"
  >
    <h3 class="text-2xl font-bold">Something went wrong</h3>
    <p>Please reload the page.</p>
  </div>
  <div
    class="flex flex-col items-center mx-auto space-y-8 text-center transition-colors duration-100 flex-0 text-neutral-900 dark:text-neutral-200"
    v-else
  >
    <div
      class="flex items-center justify-center w-10 h-10 p-2 transition-colors duration-100 bg-white rounded-full shadow-lg animate-bounce dark:bg-neutral-200 ring-1 ring-slate-900/5 dark:ring-slate-200/20"
    >
      <div class="w-5 h-5 text-neutral-900">
        <slot name="icon" :isSelf="isSelf">
          <ArrowSmUpIcon />
        </slot>
      </div>
    </div>
    <h3 class="text-2xl font-bold">
      <slot name="title" :isSelf="isSelf">No tokens found</slot>
    </h3>
    <div>
      <p>
        <slot name="description" :isSelf="isSelf">
          It seems like {{ isSelf ? "you have" : "this address has" }} none of
          the rare Mondrians.
        </slot>
      </p>

      <p>
        You should consider to
        {{ isSelf ? "create a Mondrian &#128640; and " : "" }} make some noise
        to promote the collection &#128172;
      </p>
    </div>
    <AppButton :to="`/mint`" v-if="isSelf" color="candlelight">
      Create Mondrian
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowSmUpIcon } from "@heroicons/vue/solid";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import AppButton from "@/components/app/AppButton.vue";

const props = defineProps({
  ensAccount: {
    type: Object,
  },
  error: {
    type: [String, Object],
  },
  aborted: {
    type: Boolean,
  },
});

const { address } = useWallet();

const isSelf = computed(
  () => address.value.toLowerCase() === props.ensAccount?.id?.toLowerCase()
);
</script>
