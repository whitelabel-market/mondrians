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
      :model-value="!!print.error.value"
      title="Something went wrong"
      :report="errorMessage"
    >
      {{ errorMessage }}
    </MamoAlert>

    <MamoAlert
      :model-value="print.isReady.value && !print.error.value"
      :variant="'success'"
      title="Congratulations"
    >
      Your order was successful. You will soon receive a confirmation message to
      your inbox.
    </MamoAlert>

    <MamoLoader class="mx-auto" v-if="!getTokens.isFinished" />

    <MamoPrintForm
      v-else-if="tokens.length > 0"
      :tokens="tokens"
      :skippable="false"
      :loading="print.isLoading.value"
      @submit="
        (e) => {
          payload.value = e;
          print.execute();
        }
      "
    />

    <NoTokens
      v-else
      :is-current="user.isCurrent"
      :error="getTokens.error || getTokens.aborted"
    />

    <MamoTransactionModal
      v-model="showPrintTransactionModal"
      task="Print NFT"
      :price="printPrice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, unref, toRef, ShallowRef } from "vue";
import { notify } from "notiwind";
import { useAsyncState } from "@vueuse/core";
import { useHead } from "@vueuse/head";
import printService from "@/services/print";
import { USER } from "@/utils/types";
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
import { useContract } from "@/composables/useContract";
import userService from "@/services/user";
import { User } from "@/views/user/UserView.vue";

useHead({
  title: `Print`,
});

const showPrintTransactionModal = ref(false);
const error = ref(null);
const payload = ref();
const user = inject(USER) as ShallowRef<User>;
const userAddress = toRef(user.value, "address");
const { address } = storeToRefs(useUserStore());

const printPrice = Price.print;
const contract = useContract();

const print = useAsyncState(
  async () => {
    await printTx();
    await printService.send(payload);
    notify(
      {
        group: "app",
        type: "success",
        title: "Success",
        text: "Your order was successful.",
      },
      4000
    );
  },
  null,
  {
    immediate: false,
    onError: () =>
      notify({
        group: "app",
        type: "error",
        title: "Something went wrong",
        text: errorMessage.value,
      }),
  }
);

const printTx = async function () {
  showPrintTransactionModal.value = true;
  const tx = await contract.print(
    {
      token: payload.value.token,
      address: address.value,
    },
    { txWait: false }
  );
  showPrintTransactionModal.value = false;
  await tx.wait();
};

// tokens fetch handling
const getTokens = userService.getCollectedTokens(userAddress.value);

const tokens = computed<Token[]>(
  // TODO integrate printed tokens
  () => getTokens.data?.value?.data?.tokens || []
);

const errorMessage = computed(() => getError(unref(error)));
</script>
