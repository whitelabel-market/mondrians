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
      <ArrowSmUpIcon class="w-5 h-5 text-neutral-900" />
    </div>
    <h3 class="text-2xl font-bold">
      {{ route.name === "Activity" ? "No activity" : "No tokens found" }}
    </h3>
    <div>
      <p v-if="route.name === 'CollectedItems'">
        {{
          `It seems like ${
            isSelf ? "you have" : "this address has"
          } none of the rare Mondrians.`
        }}
      </p>
      <p v-if="route.name === 'Activity'">
        {{
          `It seems like ${
            isSelf ? "you have" : "this address has"
          } no activities in this collection.`
        }}
      </p>
      <p>
        {{
          "You should consider to " +
          (isSelf ? "create a Mondrian &#128640; and " : "") +
          "make some noise to promote the collection &#128172;"
        }}
      </p>
    </div>
    <router-link
      class="relative flex items-stretch text-xs font-semibold tracking-wider uppercase transition duration-100 transform rounded cursor-pointer justify-stretch ease-out-circ after:block after:absolute after:bottom-0 after:right-0 after:w-full after:h-full after:border-neutral-800 after:-z-10 after:bg-neutral-800 after:rounded group active:scale-95 after:transform after:translate-x-1 after:translate-y-1 h-11"
      :to="`/`"
      v-if="isSelf"
    >
      <span
        class="flex items-center justify-center w-full px-8 py-3 space-x-2 text-white transition duration-100 transform border-2 rounded ease-out-circ group-hover:translate-x-1 group-hover:translate-y-1 bg-reddish border-neutral-800"
      >
        <span class="font-semibold tracking-wider uppercase"
          >Create Mondrian</span
        ></span
      >
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowSmUpIcon } from "@heroicons/vue/solid";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useRoute } from "vue-router";

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
const route = useRoute();

const isSelf = computed(
  () => address.value.toLowerCase() === props.ensAccount?.id?.toLowerCase()
);
</script>
