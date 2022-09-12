<template>
  <div>
    <MamoTokenList :tokens="tokens" :is-finished="isFinished"></MamoTokenList>
    <NoTokens
      :is-current="user.isCurrent"
      :error="error || aborted"
      v-if="isFinished && !tokens.length"
    />
  </div>
</template>

<script setup lang="ts">
import { toRef, computed, ShallowRef, inject } from "vue";
import { useHead } from "@vueuse/head";
import userService from "@/services/user";
import NoTokens from "@/views/user/components/NoTokens.vue";
import { MamoTokenList } from "@/components/TokenList";
import { User } from "@/views/user/UserView.vue";
import { USER } from "@/utils/types";

const user = inject(USER) as ShallowRef<User>;

useHead({
  title: `Collected`,
});

// tokens fetch handling
const userAddress = toRef(user.value, "address");
const { data, isFinished, error, aborted } = userService.getCollectedTokens(
  userAddress.value
);

const tokens = computed(() => data?.value?.data?.tokens || []);
</script>
