<template>
  <div
    class="container flex flex-col items-center justify-start flex-1 w-full h-full max-w-6xl pt-10 mx-auto gap-y-6"
  >
    <img
      :src="makeBlockie(route.params.id)"
      class="object-cover w-24 h-24 border-4 border-gray-200 rounded-full"
    />
    <a
      v-if="ensAccount"
      class="-mt-4 -mb-4 hover:text-blueish"
      target="_blank"
      :href="`${ENS_BASE_URL}${ensAccount.id}`"
      >{{ "@" + ensAccount.domains[0].name }}</a
    >
    <AppTooltip
      :show="copied"
      v-if="ensAccount ||(/^0x[a-fA-F0-9]{40}$/g.test(route.params.id as string))"
    >
      <template #element>
        <button
          class="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
          @click.prevent="copy(route.params.id)"
        >
          <PolygonIcon class="w-2" />
          <span class="text-xs font-medium slashed-zero">{{
            getShortAddress(ensAccount?.id || route.params.id)
          }}</span>
        </button></template
      >
    </AppTooltip>

    <span
      v-else
      class="px-3 py-2 text-xs font-medium bg-gray-100 rounded-full hover:bg-gray-200 slashed-zero"
      >Not found</span
    >
    <div class="flex items-center space-x-4">
      <ShareButtons :address="route.params.id" :hintVisible="hintVisible" />
    </div>
    <nav
      class="flex justify-center w-full mx-auto space-x-10 border-b-2 border-gray-100"
    >
      <router-link
        v-for="title in tabs"
        :key="title"
        :to="title.toLowerCase()"
        v-slot="{ isExactActive }"
      >
        <div
          :class="[
            'relative flex items-center',
            title === 'certified' &&
              (user.role !== 'certifier' ||
                user.address !== route.params.address) &&
              'cursor-not-allowed',
          ]"
        >
          <div
            class="pb-2 font-semibold capitalize transition duration-150 ease-in-out hover:text-blueish"
            :class="isExactActive ? 'text-blueish' : 'text-gray-300'"
          >
            {{ title }}
          </div>
          <span
            aria-hidden="true"
            class="absolute w-full h-0.5 -bottom-0.5 left-0 transition duration-150 ease-in-out"
            :class="isExactActive ? 'bg-blueish' : 'bg-transparent'"
          ></span>
        </div>
      </router-link>
    </nav>
    <div class="w-full">
      <router-view @showHint="hintVisible = true"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useClipboard, useFetch } from "@vueuse/core";
import { ENS_SUBGRAPH, ENS_BASE_URL } from "@/utils/constants";
import { getEnsAccount, getEnsAccountReverse } from "@/services/graphql/types";
import { getShortAddress } from "@/utils/ethereum";
import makeBlockie from "ethereum-blockies-base64";
import PolygonIcon from "@/components/icons/PolygonIcon.vue";
import AppTooltip from "@/components/app/AppTooltip.vue";
import ShareButtons from "@/components/share/ShareButtons.vue";
import AppButton from "@/components/app/AppButton.vue";

const emits = defineEmits(["loaded"]);
emits("loaded");

const hintVisible = ref(false);
const route = useRoute();
const { copy, copied } = useClipboard({ copiedDuring: 2000 });

// ens handling
const ensAccount = ref();

const { post, onFetchResponse, data } = useFetch(ENS_SUBGRAPH, {
  timeout: 10000,
  immediate: false,
}).json();

onFetchResponse(() => {
  if (data?.value?.data?.account?.domains.length > 0) {
    ensAccount.value = data.value.data.account;
  }
  if (data?.value?.data?.domains[0]?.owner?.domains.length > 0) {
    ensAccount.value = data.value.data.domains[0].owner;
  }
});

watch(
  route,
  () => {
    hintVisible.value = false;
    ensAccount.value = undefined;
    if (route?.params?.id)
      post(
        JSON.stringify({
          query: /^0x[a-fA-F0-9]{40}$/g.test(route.params.id as string)
            ? getEnsAccount
            : getEnsAccountReverse,
          variables: {
            address: /^0x[a-fA-F0-9]{40}$/g.test(route.params.id as string)
              ? (route.params.id as string).toLowerCase()
              : (route.params.id as string).toLowerCase() + ".eth",
          },
        })
      ).execute();
  },
  { deep: true, immediate: true }
);

const tabs = ["Collected", "Activity"];
</script>
