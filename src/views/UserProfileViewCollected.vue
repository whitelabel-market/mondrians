<template>
  <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-5" v-if="isFetching">
    <div
      v-for="i of 5"
      :key="i"
      class="block w-full border-2 border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueish"
    >
      <TokenCardSkeleton />
    </div>
  </div>
  <div
    class="grid w-full grid-cols-1 gap-4 sm:grid-cols-5"
    v-if="isFinished && tokens.length"
  >
    <div
      v-for="token of tokens"
      :key="token.id"
      class="block w-full border-2 border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueish"
    >
      <TokenCard :token="token" />
    </div>
  </div>
  <div
    class="flex flex-col items-center gap-4 py-32 mx-auto flex-0"
    v-if="isFinished && !tokens.length"
  >
    <h3 class="text-lg font-bold text-gray-900">No tokens found</h3>
    <div
      class="flex flex-col items-center text-base font-medium leading-tight text-gray-600"
    >
      <span
        >{{
          `It seems ${
            isSelf ? "you have" : "this address has"
          } none of the rare Mondrians.`
        }}
      </span>
      <span>
        You should consider to create one &#128640; and make some noise to
        promote the collection &#128172;
      </span>
    </div>
    <AppButton :to="'/'" :size="'md'" :fullWidth="false" class="px-4"
      >Create Mondrian</AppButton
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";
import { useWallet } from "@/composables/useWallet";
import { getTokensForAccount } from "@/services/graphql/types";
import { MAMO_SUBGRAPH } from "@/utils/constants";
import TokenCard from "@/components/tokens/TokenCard.vue";
import TokenCardSkeleton from "@/components/tokens/TokenCardSkeleton.vue";
import AppButton from "@/components/app/AppButton.vue";

const tokens = ref([]);

const route = useRoute();
const { address } = useWallet();

const emits = defineEmits(["makeSign"]);

const { post, onFetchResponse, data, isFetching, isFinished } = useFetch(
  MAMO_SUBGRAPH,
  { timeout: 10000 }
).json();

onFetchResponse(() => {
  if (data?.value?.data?.tokens.length) {
    tokens.value = data.value.data.tokens;
  } else {
    emits("makeSign");
  }
});

const isSelf = computed(
  () => address.value.toLowerCase() === route.params.id.toLowerCase()
);

watch(
  route,
  () => {
    if (route?.params?.id)
      post(
        JSON.stringify({
          query: getTokensForAccount,
          variables: {
            owner: route.params.id.toLowerCase(),
          },
        })
      ).execute();
  },
  { deep: true, immediate: true }
);
</script>
