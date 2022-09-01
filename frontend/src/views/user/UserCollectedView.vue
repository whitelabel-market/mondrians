<template>
  <div>
    <MamoTokenList :tokens="tokens" :is-finished="isFinished"></MamoTokenList>
    <NoTokens
      :ensAccount="ensAccount"
      :error="error"
      :aborted="aborted"
      v-if="isFinished && !tokens.length"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, Ref } from "vue";
import { useFetch } from "@vueuse/core";
import { useHead } from "@vueuse/head";
import CONFIG from "@/../../config";
import { ENS_ACCOUNT, EnsAccount } from "@/utils/types";
import type { Token } from "@/utils/types";
import { getTokensForAccount } from "@/services/graphql/types";
import NoTokens from "@/views/user/components/NoTokens.vue";
import { MamoTokenList } from "@/components/TokenList";

const emits = defineEmits(["showHint"]);

const tokens = ref<Token[]>([]);
const ensAccount = inject<Ref<EnsAccount>>(ENS_ACCOUNT);

useHead({
  title: `Collected`,
});

// tokens fetch handling

const { onFetchResponse, data, isFinished, error, aborted, post } = useFetch(
  CONFIG.subgraph.mamo,
  {
    timeout: 10000,
    immediate: false,
  }
).json();

onFetchResponse(() => {
  if (data?.value?.data?.tokens.length) {
    tokens.value = data.value.data.tokens;
  } else {
    emits("showHint");
  }
});

watch(
  () => ensAccount,
  () => {
    if (ensAccount?.value?.id) {
      post(
        JSON.stringify({
          query: getTokensForAccount,
          variables: {
            owner: ensAccount?.value?.id.toLowerCase(),
          },
        })
      ).execute();
    }
  },
  { deep: true }
);
</script>
