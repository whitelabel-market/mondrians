<template>
  <div
    class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lgs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    v-if="!isFinished"
  >
    <div
      v-for="i of 5"
      :key="i"
      class="block w-full focus:outline-none focus:ring-2 focus:ring-blueish"
    >
      <TokenCardSkeleton />
    </div>
  </div>
  <div
    class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lgs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    v-if="isFinished && tokens.length"
  >
    <div
      v-for="token of tokens"
      :key="token.id"
      class="block w-full focus:outline-none focus:ring-2 focus:ring-blueish"
    >
      <TokenCard :token="token" />
    </div>
  </div>
  <NoTokens :ensAccount="ensAccount" v-if="isFinished && !tokens.length" />
</template>

<script setup lang="ts">
import { ref, watch, inject, Ref } from "vue";
import { getTokensForAccount } from "@/services/graphql/types";
import TokenCard from "@/components/tokens/TokenCard.vue";
import TokenCardSkeleton from "@/components/tokens/TokenCardSkeleton.vue";
import NoTokens from "@/components/user/NoTokens.vue";
import { MAMO_SUBGRAPH } from "@/utils/constants";
import { ENS_ACCOUNT, EnsAccount } from "@/utils/types";
import type { Token } from "@/utils/types";
import { useFetch } from "@vueuse/core";

const emits = defineEmits(["showHint"]);

const tokens = ref<Token[]>([]);
const ensAccount = inject<Ref<EnsAccount>>(ENS_ACCOUNT);

// tokens fetch handling

const { onFetchResponse, data, isFinished, post } = useFetch(MAMO_SUBGRAPH, {
  timeout: 10000,
  immediate: false,
}).json();

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
