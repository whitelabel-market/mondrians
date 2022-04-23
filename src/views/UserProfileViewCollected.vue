<template>
  <div class="grid w-full grid-cols-5 gap-4">
    <div
      v-for="token of tokens"
      :key="token.id"
      class="block w-full border-2 border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueish"
    >
      <TokenCard :token="token" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";
import { getTokensForAccount } from "@/services/graphql/types";
import { MAMO_SUBGRAPH } from "@/utils/constants";
import TokenCard from "@/components/tokens/TokenCard.vue";

const tokens = ref([]);

const route = useRoute();

const { data, onFetchResponse } = useFetch(MAMO_SUBGRAPH)
  .post(
    JSON.stringify({
      query: getTokensForAccount,
      variables: {
        owner: route.params.id.toLowerCase(),
      },
    })
  )
  .json();

onFetchResponse(() => {
  if (data?.value?.data?.tokens) {
    tokens.value = data.value.data.tokens;
  }
});
</script>
