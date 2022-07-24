<template>
  <div class="max-w-2xl space-y-8">
    <div>
      <p class="text-center md:text-left">{{ MintDescription.event }}</p>
    </div>

    <AppLoadingSpinner v-if="!isFinished" class="mx-auto" />

    <EventTask
      v-else-if="tokens.length > 0"
      @submit="sendTicket"
      :loading="loading"
      :skippable="false"
    />

    <NoTokens
      v-else
      :ensAccount="ensAccount"
      :error="error"
      :aborted="aborted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, Ref } from "vue";
import { getTokensForAccount } from "@/services/graphql/types";
import NoTokens from "@/components/user/NoTokens.vue";
import CONFIG from "@/../../config";
import { ENS_ACCOUNT, EnsAccount } from "@/utils/types";
import type { Token } from "@/utils/types";
import { useFetch } from "@vueuse/core";
import EventTask from "@/components/mint/EventTask.vue";
import { authInterface } from "@/services/BackendInterface";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import { MintDescription } from "@/utils/constants";

const emits = defineEmits(["showHint"]);

const loading = ref(false);

const tokens = ref<Token[]>([]);
const ensAccount = inject<Ref<EnsAccount>>(ENS_ACCOUNT);

const sendTicket = async function (email: string) {
  try {
    if (loading.value) {
      return;
    }
    loading.value = true;
    await authInterface.sendMail(email);
  } finally {
    loading.value = false;
  }
};

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
