<template>
  <div class="flex flex-col items-center max-w-2xl mx-auto space-y-8">
    <div>
      <p
        class="text-center transition-colors duration-200 text-neutral-900 dark:text-neutral-200"
      >
        {{ MintDescription.print }} After submitting you will have to confirm a
        transaction in your wallet to pay for your print order. This is the only
        payment, no other fees will be charged later on. If the order was
        successful you will receive a confirmation message to your inbox.
      </p>
    </div>

    <MamoAlert
      v-model="showError"
      title="Something went wrong"
      :report="errorMessage"
    >
      {{ errorMessage }}
    </MamoAlert>

    <MamoAlert
      v-model="showSuccess"
      :variant="'success'"
      title="Congratulations"
    >
      Your order was successful. You will soon receive a confirmation message to
      your inbox.
    </MamoAlert>

    <MamoLoader class="mx-auto" v-if="!isFinished" />

    <MamoPrintForm
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

    <MamoTransactionModal
      v-model="showPrintTransactionModal"
      task="Print NFT"
      :price="printPrice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, Ref, computed, unref } from "vue";
import { ethers } from "ethers";
import { notify } from "notiwind";
import { useFetch } from "@vueuse/core";
import { useHead } from "@vueuse/head";

import CONFIG from "@/../../config";
import { authInterface, printedTokens } from "@/services/BackendInterface";
import MondrianInterface from "@/services/MondrianInterface";
import { getTokensForAccount } from "@/services/graphql/types";
import { ENS_ACCOUNT, EnsAccount } from "@/utils/types";
import type { Token } from "@/utils/types";
import { getError } from "@/utils/error";
import { MintDescription, Price } from "@/utils/constants";
import NoTokens from "@/views/user/components/NoTokens.vue";
import { MamoPrintForm } from "@/components/PrintForm";
import { MamoLoader } from "@/components/Loader";
import { MamoAlert } from "@/components/Alert";
import { MamoTransactionModal } from "@/components/WalletModal";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";

const emits = defineEmits(["showHint"]);

useHead({
  title: `Print`,
});

const showPrintTransactionModal = ref(false);
const loading = ref(false);
const error = ref(null);
const showError = ref(false);
const showSuccess = ref(false);

const tokens = ref<Token[]>([]);
const ensAccount = inject<Ref<EnsAccount>>(ENS_ACCOUNT);
const { address, provider } = storeToRefs(useUserStore());
const printPrice = Price.print;

const print = async function (printData: any) {
  if (loading.value) {
    return;
  }
  try {
    loading.value = true;
    await sendPrintTx(printData);
    await authInterface.print(printData);
    showSuccess.value = true;
    notify(
      {
        group: "app",
        type: "success",
        title: "Success",
        text: "Your order was successful.",
      },
      4000
    );
    printedTokens.value.push(printData.token.id);
  } catch (err: any) {
    error.value = err;
    showError.value = true;
    notify({
      group: "app",
      type: "error",
      title: "Something went wrong",
      text: errorMessage.value,
    });
  } finally {
    loading.value = false;
  }
};

const sendPrintTx = async function (printData: any) {
  const mondrianInterface: MondrianInterface = new MondrianInterface(
    provider as ethers.providers.Web3Provider
  );
  showPrintTransactionModal.value = true;
  let tx = null;
  try {
    tx = await mondrianInterface.print(
      {
        token: printData.token,
        address: address.value,
      },
      { txWait: false }
    );
  } finally {
    showPrintTransactionModal.value = false;
  }
  return tx?.wait();
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

const availableTokensForPrint = computed(() => {
  return tokens.value.filter(
    (token: any) => !printedTokens.value.includes(token.id)
  );
});

const errorMessage = computed(() => getError(unref(error)));
</script>
