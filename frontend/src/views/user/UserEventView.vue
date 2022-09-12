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
      :model-value="!!sendInvitation.error.value"
      title="Something went wrong"
      :report="errorMessage"
    >
      {{ errorMessage }}
    </MamoAlert>

    <MamoAlert
      :model-value="sendInvitationSuccess"
      :variant="'success'"
      title="Congratulations"
    >
      You received an invitation in your mailbox.
    </MamoAlert>

    <MamoLoader v-if="sendInvitation.isFetching.value" />

    <MamoEventForm
      v-else-if="tokens.length > 0"
      v-model="email"
      @submit="sendInvitation.execute()"
      :loading="getTokens.loading"
      :skippable="false"
    />

    <NoTokens v-else :is-current="user.isCurrent" :error="getTokensError" />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, unref, ShallowRef, toRef } from "vue";
import { notify } from "notiwind";
import { useHead } from "@vueuse/head";
import saleService from "@/services/sale";
import { MintDescription } from "@/utils/constants";
import { getError } from "@/utils/error";
import { USER } from "@/utils/types";
import type { Token } from "@/utils/types";
import NoTokens from "@/views/user/components/NoTokens.vue";
import { MamoLoader } from "@/components/Loader";
import { MamoAlert } from "@/components/Alert";
import { MamoEventForm } from "@/components/EventForm";
import { User } from "@/views/user/UserView.vue";
import userService from "@/services/user";

useHead({
  title: `Event Invitation`,
});

const email = ref("");
const user = inject(USER) as ShallowRef<User>;
const userAddress = toRef(user.value, "address");

const getTokens = userService.getCollectedTokens(userAddress.value);
const sendInvitation = saleService.sendEventInvitation(
  { email: unref(email) },
  { immediate: false }
);

sendInvitation.onFetchError(() =>
  notify({
    group: "app",
    type: "error",
    title: "Something went wrong",
    text: errorMessage,
  })
);

const tokens = computed<Token[]>(
  () => getTokens.data?.value?.data?.tokens || []
);

const errorMessage = computed(() => getError(unref(sendInvitation.error)));
const sendInvitationSuccess = computed(
  () => sendInvitation.isFinished.value && !!sendInvitation.data.value
);
const getTokensError = computed(
  () => getTokens.error.value || getTokens.aborted.value
);
</script>
