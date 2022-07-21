<template>
  <div class="max-w-2xl">
    <TicketTask v-if="isFinished && tokens.length" />
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
import { getTokensForAccount } from "@/services/graphql/types";
import TokenCard from "@/components/tokens/TokenCard.vue";
import TokenCardSkeleton from "@/components/tokens/TokenCardSkeleton.vue";
import NoTokens from "@/components/user/NoTokens.vue";
import { MAMO_SUBGRAPH } from "@/utils/constants";
import { ENS_ACCOUNT, EnsAccount } from "@/utils/types";
import type { Token } from "@/utils/types";
import { useFetch } from "@vueuse/core";
import TokenList from "@/components/tokens/TokenList.vue";
import AppButton from "@/components/app/AppButton.vue";
import TokenCardPrint from "@/components/tokens/TokenCardPrint.vue";
import TicketTask from "@/components/mint/TicketTask.vue";

const emits = defineEmits(["showHint"]);

const tokens = ref<Token[]>([]);
const ensAccount = inject<Ref<EnsAccount>>(ENS_ACCOUNT);

// tokens fetch handling

const { onFetchResponse, data, isFinished, error, aborted, post } = useFetch(
  MAMO_SUBGRAPH,
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
