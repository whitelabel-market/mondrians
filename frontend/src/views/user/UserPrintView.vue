<template>
  <div>
    <div class="max-w-2xl" v-if="isFinished && tokens.length">
      <PrintTask
        :tokens="tokens"
        :skippable="false"
        :loading="loading"
        @submit="print"
      />
    </div>
    <NoTokens
      :ensAccount="ensAccount"
      :error="error"
      :aborted="aborted"
      v-if="isFinished && !tokens.length"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, Ref, toRaw } from "vue";
import { getTokensForAccount } from "@/services/graphql/types";
import NoTokens from "@/components/user/NoTokens.vue";
import CONFIG from "@/../../config";
import { ENS_ACCOUNT, EnsAccount } from "@/utils/types";
import type { Token } from "@/utils/types";
import { useFetch } from "@vueuse/core";
import PrintTask from "@/components/mint/PrintTask.vue";
import { authInterface } from "@/services/BackendInterface";
import MondrianInterface from "@/services/MondrianInterface";
import { ethers } from "ethers";
import { useWalletExtended } from "@/composables/useWalletExtended";

const emits = defineEmits(["showHint"]);

const loading = ref(false);

const tokens = ref<Token[]>([]);
const ensAccount = inject<Ref<EnsAccount>>(ENS_ACCOUNT);
const { provider } = useWalletExtended();

const print = async function (printData: any) {
  if (loading.value) {
    return;
  }

  try {
    loading.value = true;

    const mondrianInterface: MondrianInterface = new MondrianInterface(
      toRaw(provider.value as ethers.providers.Web3Provider)
    );

    await mondrianInterface.print();

    await authInterface.print({
      ...printData,
      countryCode: "de",
    });
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
