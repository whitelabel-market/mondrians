<template>
  <div
    class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lgs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    v-if="!isFinished"
  >
    <div
      v-for="i of 5"
      :key="i"
      class="block w-full focus:outline-none focus:ring-2 focus:ring-dodgerblue"
    >
      <ActivitySkeleton />
    </div>
  </div>
  <div
    class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lgs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    v-if="isFinished && transfers.length"
  >
    <div
      v-for="(transfer, index) in transfers"
      :key="index"
      class="block w-full focus:outline-none focus:ring-2 focus:ring-dodgerblue"
    >
      <Activity :transfer="transfer" />
    </div>
  </div>
  <NoTokens
    :is-current="user.isCurrent"
    :error="error || aborted"
    v-if="isFinished && !transfers.length"
  >
    <template v-slot:title>No Activity</template>
    <template v-slot:description="{ isCurrent }">
      It seems like {{ isCurrent ? "you have" : "this address has" }} no
      activities in this collection.
    </template>
  </NoTokens>
</template>

<script setup lang="ts">
import { computed, inject, ShallowRef } from "vue";
import Activity from "@/views/user/components/Activity.vue";
import ActivitySkeleton from "@/views/user/components/ActivitySkeleton.vue";
import NoTokens from "@/views/user/components/NoTokens.vue";
import { useHead } from "@vueuse/head";
import userService from "@/services/user";
import { USER } from "@/utils/types";
import { User } from "@/views/user/UserView.vue";

const user = inject(USER) as ShallowRef<User>;

useHead({
  title: `Activity`,
});

const { data, isFinished, error, aborted } = userService.getActivity(
  user.value.address
);

const transfers = computed(() =>
  !data.value?.data?.account
    ? []
    : [
        ...data.value.data.account.transfersFrom,
        ...data.value.data.account.transfersTo,
      ]
);
</script>
