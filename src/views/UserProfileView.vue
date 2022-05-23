<template>
  <div>
    <header class="pt-20 bg-yellowish mondrian-border-b bg-hero-pattern">
      <div
        class="container flex flex-col items-center justify-start flex-1 w-full h-full mx-auto space-y-12"
      >
        <img
          :src="makeBlockie(route.params.id)"
          class="object-cover w-24 h-24 border-8 border-black rounded-xl"
        />

        <div class="flex flex-col items-center gap-4">
          <div class="text-center">
            <div
              class="flex items-center space-x-2"
              v-if="ensAccount ||(/^0x[a-fA-F0-9]{40}$/g.test(route.params.id as string))"
            >
              <h1 class="text-2xl font-bold slashed-zero">
                {{ getShortAddress(ensAccount?.id || route.params.id) }}
              </h1>
              <AppButton
                only-icon
                size="sm"
                flat
                color="blank"
                :tooltip="copied ? 'Copied' : 'Copy'"
                @click.prevent="copy(ensAccount?.id || route.params.id)"
              >
                <ClipboardCopyIcon class="w-4 h-4"></ClipboardCopyIcon>
              </AppButton>
            </div>

            <a
              v-if="ensAccount"
              class="block mx-auto"
              target="_blank"
              :href="`${ENS_BASE_URL}${ensAccount.id}`"
              >{{ "@" + ensAccount.domains[0].name }}</a
            >
          </div>

          <div
            class="space-x-4 flex items-center justify-start transform -translate-x-0.5 -translate-y-0.5"
          >
            <ShareButtons
              :address="route.params.id"
              :hintVisible="hintVisible"
            />
          </div>
        </div>

        <nav
          class="relative flex items-center justify-center w-full h-16 space-x-8"
        >
          <router-link
            v-for="title in tabs"
            :key="title"
            :to="title.toLowerCase()"
            class="relative flex items-center text-xs font-black uppercase transition duration-200 ease-in-out"
          >
            {{ title }}
          </router-link>
        </nav>
      </div>
    </header>
    <section>
      <div class="container px-8 mx-auto">
        <router-view @showHint="hintVisible = true"></router-view>
      </div>
    </section>
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
import ShareButtons from "@/components/share/ShareButtons.vue";
import AppButton from "@/components/app/AppButton.vue";
import { ClipboardCopyIcon } from "@heroicons/vue/solid";

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
