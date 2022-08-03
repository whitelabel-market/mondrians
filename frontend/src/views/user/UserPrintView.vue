<template>
  <div class="flex flex-col items-center max-w-2xl mx-auto space-y-8">
    <div>
      <p class="text-center text-neutral-900 dark:text-neutral-50">
        {{ MintDescription.print }} After submitting you will have to confirm a
        transaction in your wallet to pay for your print order. This is the only
        payment, no other fees will be charged later on. If the order was
        successful you will receive a confirmation message to your inbox.
      </p>
    </div>

    <AppAlert v-model="showError" title="Something went wrong">
      {{ error }}
    </AppAlert>

    <AppAlert
      v-model="showSuccess"
      :variant="'success'"
      title="Congratulations"
    >
      Your order was successful. You will soon receive a confirmation message to
      your inbox.
    </AppAlert>

    <AppLoadingSpinner class="mx-auto" v-if="!isFinished" />

    <PrintTask
      v-else-if="tokens.length > 0"
      :tokens="availableTokensForPrint"
      :skippable="false"
      :loading="loading"
      @submit="print"
    />

    <NoTokens
      :ensAccount="ensAccount"
      :error="error"
      :aborted="aborted"
      v-else
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, Ref, toRaw, computed, onMounted } from "vue";
import { getTokensForAccount } from "@/services/graphql/types";
import NoTokens from "@/components/user/NoTokens.vue";
import CONFIG from "@/../../config";
import { ENS_ACCOUNT, EnsAccount } from "@/utils/types";
import type { Token } from "@/utils/types";
import { useFetch, watchOnce } from "@vueuse/core";
import PrintTask from "@/components/mint/PrintTask.vue";
import { authInterface } from "@/services/BackendInterface";
import MondrianInterface from "@/services/MondrianInterface";
import { ethers } from "ethers";
import { useWalletExtended } from "@/composables/useWalletExtended";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import { MintDescription } from "@/utils/constants";
import AppAlert from "@/components/app/AppAlert.vue";

const emits = defineEmits(["showHint"]);

const loading = ref(false);
const error = ref(null);
const showError = ref(false);
const showSuccess = ref(false);
const printedTokens = ref<string[]>([]);

const tokens = ref<Token[]>([]);
const ensAccount = inject<Ref<EnsAccount>>(ENS_ACCOUNT);
const { provider, authInterfaceCreated } = useWalletExtended();

const print = async function (printData: any) {
  if (loading.value) {
    return;
  }

  try {
    loading.value = true;

    const mondrianInterface: MondrianInterface = new MondrianInterface(
      toRaw(provider.value as ethers.providers.Web3Provider)
    );

    await mondrianInterface.print(printData.token);
    await authInterface.print(printData);
    showSuccess.value = true;
  } catch (err: any) {
    error.value = err;
    showError.value = true;
  } finally {
    loading.value = false;
  }
};

// tokens fetch handling

const { onFetchResponse, data, isFinished, aborted, post } = useFetch(
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

const getPrintedTokens = async () => {
  if (authInterfaceCreated.value) {
    const { tokens } = await authInterface.getPrintedTokens();
    printedTokens.value = tokens;
  }
};

onMounted(async () => {
  getPrintedTokens();
});

watchOnce(authInterfaceCreated, async () => {
  getPrintedTokens();
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

const availableTokensForPrint = computed(() =>
  tokens.value.filter((token: any) => !printedTokens.value.includes(token.id))
);
</script>
