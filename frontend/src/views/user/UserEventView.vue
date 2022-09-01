<template>
  <div class="flex flex-col items-center max-w-2xl mx-auto space-y-8">
    <div>
      <p
        class="text-center transition-colors duration-200 text-neutral-800 dark:text-neutral-200"
      >
        {{ MintDescription.event }}
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
      You received an invitation in your mailbox.
    </MamoAlert>

    <MamoLoader v-if="!isFinished" />

    <MamoEventForm
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
import { ref, watch, inject, Ref, computed, unref } from "vue";
import { notify } from "notiwind";
import { useFetch } from "@vueuse/core";
import { useHead } from "@vueuse/head";
import CONFIG from "@/../../config";
import { authInterface } from "@/services/BackendInterface";
import { getTokensForAccount } from "@/services/graphql/types";
import { MintDescription } from "@/utils/constants";
import { getError } from "@/utils/error";
import { ENS_ACCOUNT, EnsAccount } from "@/utils/types";
import type { Token } from "@/utils/types";
import NoTokens from "@/views/user/components/NoTokens.vue";
import { MamoLoader } from "@/components/Loader";
import { MamoAlert } from "@/components/Alert";
import { MamoEventForm } from "@/components/EventForm";

const emits = defineEmits(["showHint"]);

useHead({
  title: `Event Invitation`,
});

const loading = ref(false);
const error = ref(null);
const showError = ref(false);
const showSuccess = ref(false);

const tokens = ref<Token[]>([]);
const ensAccount = inject<Ref<EnsAccount>>(ENS_ACCOUNT);

const sendTicket = async function (email: string) {
  try {
    if (loading.value) {
      return;
    }
    loading.value = true;
    await authInterface.sendMail(email);
    showSuccess.value = true;
  } catch (err: any) {
    console.log("err", err);
    error.value = err;
    showError.value = true;
    notify({
      group: "app",
      type: "error",
      title: "Something went wrong",
      text: errorMessage,
    });
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

const errorMessage = computed(() => getError(unref(error)));
</script>
